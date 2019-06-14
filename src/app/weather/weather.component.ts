import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityListService} from '../service/city-list.service';
import {Subscription} from 'rxjs';
import {CityModel} from '../model/cityList';
import {OpenweatherService} from '../service/openweather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  citylistSub: Subscription;
  cityListArray: Array<CityModel>;

  constructor(private city: CityListService,
              private openweather: OpenweatherService) {
  }

  ngOnInit() {
    this.getCityList();
  }

  // Pobieranie listy miast
  getCityList() {
    this.citylistSub = this.city.getlistOfCities().subscribe(value => {
      this.cityListArray = value;
      console.log(this.cityListArray);
    });

    this.openweather.getWeatherInfo('Poznan', '9b9da861fa27d666f076014dfb60418f').subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy() {
    this.citylistSub.unsubscribe();
  }

}

