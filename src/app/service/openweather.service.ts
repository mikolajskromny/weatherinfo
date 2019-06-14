import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  constructor(private http: HttpClient) { }

  getWeatherInfo(city: string, apiKey: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`);
  }

}
