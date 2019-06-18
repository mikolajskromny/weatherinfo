import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OpenWeatherMap, WeatherInfo} from '../model/openWeatherMap';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(private http: HttpClient) { }

  getWeatherInfo(cityId: number[], apiKey: string) {
    return this.http.get<WeatherInfo>(`http://api.openweathermap.org/data/2.5/group?id=${cityId}&units=metric&APPID=${apiKey}`);
  }

}
