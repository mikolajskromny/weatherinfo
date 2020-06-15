import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OpenweatherService} from '../../../service/openweather.service';
import {ICityModel} from '../../../model/cityList';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Coords, IFiveDayForecast} from '../../../model/openWeatherMap';
import * as moment from 'moment';
import {IAllCityForecast, IAverageTemperature, IGroupedFiveDayForecast} from '../../../model/fiveDayForecast';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss']
})
export class FiveDayForecastComponent implements OnInit, OnDestroy {

  @Input() cityListArray: ICityModel[];
  @Input() apiKey: string;
  @Input() coords: Coords;
  fiveDayWeatherInfo: IFiveDayForecast[];
  sortedDates: IGroupedFiveDayForecast[];
  openWeatherSub: Subscription;
  groupByKey: any;
  averageTempArray: IAverageTemperature[] = [];
  averageTemp: IAverageTemperature;
  fiveDayForecastArray: IAllCityForecast[] = [];
  whichData = true;

  constructor(private openWeatherService: OpenweatherService,
              private messageService: MessageService) {
    this.fiveDayWeatherInfo = [];
    this.averageTemp = {
      date: '',
      temp: 0,
      icon: '',
      wind_speed: null
    };
  }

  // Function round values to 0.5
  static roundTemp(value) {
    return Math.round(value * 2) / 2;
  }

  ngOnInit() {
    moment.locale('pl');
    this.getCityList();
  }

  getCityList() {
    this.cityListArray.forEach(value => {
      this.getWeatherInfo(value.id);
    });
  }

  // Getting five day forecast
  getWeatherInfo(cityId) {
    this.openWeatherSub = this.openWeatherService.getFiveDayForecast(cityId, this.apiKey).subscribe(value => {
      this.sortWeatherInfoByDate(value);
      this.fiveDayWeatherInfo.push(value);
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

  sortWeatherInfoByDate(data: IFiveDayForecast) {
    let index = -1;
    // Converting date to day and month
    data.list.forEach(value => {
      value.dt_txt = moment(value.dt_txt).format('DD.MM');
    });
    // Grouping data from API by date, for each day is generating new array
    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        if (obj[key] !== this.groupByKey) {
          index++;
        }
        this.groupByKey = obj[key];
        objectsByKeyValue[index] = (objectsByKeyValue[index] || []).concat(obj);
        return objectsByKeyValue;
      }, []);

    const groupeByDate = groupBy('dt_txt');
    this.sortedDates = groupeByDate(data.list);

    // Assigning values in loops
    this.sortedDates.forEach(value => {
      value.forEach(value2 => {
        this.averageTemp.icon = value2.weather[0].icon;
        this.averageTemp.wind_speed = value2.wind.speed;
        this.averageTemp.date = value2.dt_txt;
        this.averageTemp.temp += value2.main.temp;
      });
      this.averageTempArray.push({
        date: this.averageTemp.date,
        temp: FiveDayForecastComponent.roundTemp(this.averageTemp.temp / value.length),
        icon: this.averageTemp.icon,
        wind_speed: this.averageTemp.wind_speed,
      });
      this.averageTemp.temp = 0;                      // after each loop of data in one day, variable has to be reset
    });
    this.fiveDayForecastArray.push({
      results: this.averageTempArray,
      city_name: data.city.name,
      which_data: this.whichData                      // Changing between temperature and wind speed
    });
    this.averageTempArray = [];                       // after each loop of cities in the array, array has to be reset
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
