import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IActualForecast, IActualWeatherInfo, IFiveDayForecast} from '../model/openWeatherMap';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(private http: HttpClient) { }

  getActualWeatherInfo(cityId: number[], apiKey: string) {
    return this.http.get<IActualWeatherInfo>(`http://api.openweathermap.org/data/2.5/group?id=${cityId}&units=metric&APPID=${apiKey}`);
  }

  getFiveDayForecast(cityId: number, apiKey: string) {
    return this.http.get<IFiveDayForecast>(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&APPID=${apiKey}`);
  }

}
