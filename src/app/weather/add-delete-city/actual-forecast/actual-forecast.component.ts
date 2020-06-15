import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICityModel} from '../../../model/cityList';
import {OpenweatherService} from '../../../service/openweather.service';
import {Subscription} from 'rxjs';
import {Coords, IActualForecast} from '../../../model/openWeatherMap';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-actual-forecast',
  templateUrl: './actual-forecast.component.html',
  styleUrls: ['./actual-forecast.component.scss']
})
export class ActualForecastComponent implements OnInit, OnDestroy {

  @Input() cityListArray: ICityModel[];
  @Input() apiKey: string;
  @Input() coords: Coords;
  weatherInfo: IActualForecast[];
  cityId = [];
  openWeatherSub: Subscription;

  constructor(private openWeatherService: OpenweatherService,
              private messageService: MessageService) {
  }

  // Function round values to 0.5
  static roundTemp(value) {
    return Math.round(value * 2) / 2;
  }

  ngOnInit() {
      if (this.cityListArray.length > 0) {
        this.cityListArray.forEach(value => {
          this.cityId.push(value.id);
        });
        this.getWeatherInfo();
      }
  }

  // Getting weather from service through http and displaying possible warnings
  getWeatherInfo() {
    this.openWeatherSub = this.openWeatherService.getActualWeatherInfo(this.cityId, this.apiKey).subscribe(value => {
        value.list.forEach(data => {
          data.main.temp = ActualForecastComponent.roundTemp(data.main.temp);
        });
        this.weatherInfo = value.list;

    }, error1 => {
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
    this.openWeatherSub.unsubscribe();
  }

}
