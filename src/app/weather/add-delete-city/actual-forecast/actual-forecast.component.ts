import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CityModel} from '../../../model/cityList';
import {OpenweatherService} from '../../../service/openweather.service';
import {ApiKeyService} from '../../../service/api-key.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-actual-forecast',
  templateUrl: './actual-forecast.component.html',
  styleUrls: ['./actual-forecast.component.scss']
})
export class ActualForecastComponent implements OnInit, OnDestroy {

  @Input() cityListArray: CityModel[];
  apiKey: string;
  cityId = [];
  getApiKeySub: Subscription;

  constructor(private openWeatherService: OpenweatherService,
              private apiKeyService: ApiKeyService) { }

  ngOnInit() {
    console.log(this.cityListArray);
    this.cityListArray.forEach(value => {
      this.cityId.push(value.id);
    });
    this.getApiKeySub = this.apiKeyService.getApiKey().subscribe(value => this.apiKey = value);
    this.getWeatherInfo();
    console.log(this.cityId);
  }

  getWeatherInfo() {
    this.openWeatherService.getWeatherInfo(this.cityId, this.apiKey).subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy() {
    this.getApiKeySub.unsubscribe();
  }

}
