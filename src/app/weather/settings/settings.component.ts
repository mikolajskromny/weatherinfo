import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiKeyService} from '../../service/api-key.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public apiKey: string;
  private getApiKeySub: Subscription;

  constructor(private apiKeyService: ApiKeyService) {
  }

  ngOnInit() {
    this.getApiKeySub = this.apiKeyService.getApiKey().subscribe(value => this.apiKey = value);
  }

  saveApiKey() {
    this.apiKeyService.setApiKey(this.apiKey);
  }

  ngOnDestroy() {
    this.getApiKeySub.unsubscribe();
  }

}
