import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CityModel} from '../../../model/cityList';
import {OpenweatherService} from '../../../service/openweather.service';
import {ApiKeyService} from '../../../service/api-key.service';
import {Subscription} from 'rxjs';
import {OpenWeatherMap} from '../../../model/openWeatherMap';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-actual-forecast',
  templateUrl: './actual-forecast.component.html',
  styleUrls: ['./actual-forecast.component.scss']
})
export class ActualForecastComponent implements OnInit, OnDestroy {

  constructor(private openWeatherService: OpenweatherService,
              private apiKeyService: ApiKeyService,
              private messageService: MessageService) {
  }

  @Input() cityListArray: CityModel[];
  weatherInfo: OpenWeatherMap[];
  apiKey: string;
  cityId = [];
  getApiKeySub: Subscription;

      // Function round values to 0.5
  static roundTemp(value) {
    return Math.round(value * 2) / 2;
  }

  ngOnInit() {
    this.cityListArray.forEach(value => {
      this.cityId.push(value.id);
    });
    this.getApiKeySub = this.apiKeyService.getApiKey().subscribe(value => this.apiKey = value);
    this.getWeatherInfo();
  }
      // Getting weather from service through http and displaying possible warnings
  getWeatherInfo() {
    this.openWeatherService.getWeatherInfo(this.cityId, this.apiKey).subscribe(value => {
      console.log(value);
      value.list.forEach(data => {
        data.main.temp = ActualForecastComponent.roundTemp(data.main.temp);
      });
      this.weatherInfo = value.list;
    }, error1 => {
      console.log(error1);
      if (error1.statusText === 'Unauthorized') {
        this.toast(
          'error',
          'Niepoprawny klucz API',
          'W zakładce ustawienia wprowadź poprawny klucz');
      } else {
        this.toast(
          'warn',
          'Brak danych na temat jednego z miast',
          'Sprawdź czy zapisane miasta znajdują się na liście');
      }
    });
  }
      // Universal function for toasts messages
  toast(severity: string, summary: string, detail?: string) {
    this.messageService.add({
      key: 'basic',
      severity,
      summary,
      detail,
      life: 3000
    });
  }

  ngOnDestroy() {
    this.getApiKeySub.unsubscribe();
  }

}
