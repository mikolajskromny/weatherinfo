import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ICityModel} from '../../model/cityList';
import {CityListService} from '../../service/city-list.service';
import {MessageService} from 'primeng/api';
import {ApiKeyService} from '../../service/api-key.service';
import {Coords} from "../../model/openWeatherMap";
import {OpenweatherService} from "../../service/openweather.service";
import {WeatherButtonLabel} from "../../model/label";

@Component({
  selector: 'app-add-delete-city',
  templateUrl: './add-delete-city.component.html',
  styleUrls: ['./add-delete-city.component.scss']
})
export class AddDeleteCityComponent implements OnInit, OnDestroy {

  citylistSub: Subscription;
  currentLocationSub: Subscription;
  addedCityListArray: ICityModel[];
  cityListArray: string[];
  showActualWeather = false;
  showFiveDayWeather = false;
  showActualWeatherButtonLabel: string;
  showFiveDayWeatherButtonLabel: string;
  favouriteCityList: ICityModel;
  removeId: number;
  removeIdFromLocalStorage: number;
  private getApiKeySub: Subscription;
  disabledButtonShowWeather = true;
  hideButtonRemove = false;
  apiKey: string;
  lat: number;
  lng: number;
  zoom: number;
  coordinates: Coords;

  constructor(private cityService: CityListService,
              private messageService: MessageService,
              private apiKeyService: ApiKeyService,
              private openWeatherService: OpenweatherService) {
  }

  ngOnInit() {
    this.showActualWeatherButtonLabel = WeatherButtonLabel.showActualWeather;
    this.showFiveDayWeatherButtonLabel = WeatherButtonLabel.showActualForecast;

    // Checking if api key is valid and disabling button if not
    this.getApiKeySub = this.apiKeyService.getApiKey().subscribe(value => {
      this.apiKey = value;
      if (value) {
        this.disabledButtonShowWeather = false;
      }
    });
    // Getting saved cities in Local Storage
    this.addedCityListArray = this.cityService.getSavedCities();
    // Checking if any city is added and hiding button if not
    if (this.addedCityListArray.length) {
      this.hideButtonRemove = true;
    }
  }

  // Function which pass event to the filtering function
  search(event) {
    if (this.showActualWeather) {
      this.showActualWeather = false;
      this.showActualWeatherButtonLabel = WeatherButtonLabel.updateWeather;
    }
    if (this.showFiveDayWeather) {
      this.showFiveDayWeather = false;
      this.showFiveDayWeatherButtonLabel = WeatherButtonLabel.updateForecast;
    }
    const queryy = event.query;
    this.citylistSub = this.cityService.getlistOfCities().subscribe(data => {
      this.cityListArray = this.filterCities(queryy, data);
    });
  }

  // Filtering function
  filterCities(query, cities: ICityModel[]): any[] {
    const filtered: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(city);
      }
    }
    return filtered;
  }

  // Setting label of button to display forecast
  showActualWeatherForecast() {
    if (this.addedCityListArray.length) {
      this.showActualWeather = !this.showActualWeather;
      if (!this.showActualWeather) {
        this.showActualWeatherButtonLabel = WeatherButtonLabel.showActualWeather;
      } else {
        this.showActualWeatherButtonLabel = WeatherButtonLabel.closeWeather;
      }
    } else {
      this.toast(
        'warn',
        'You don`t choose any city.',
        'Start typing city name.'
      );
    }
  }

  showFiveDayWeatherForecast() {
    if (this.addedCityListArray.length) {
      this.showFiveDayWeather = !this.showFiveDayWeather;
      if (!this.showFiveDayWeather) {
        this.showFiveDayWeatherButtonLabel = WeatherButtonLabel.showActualForecast;
      } else {
        this.showFiveDayWeatherButtonLabel = WeatherButtonLabel.closeForecast;
      }
    } else {
      this.toast(
        'warn',
        'You don`t choose any city.',
        'Start typing city name.'
      );
    }
  }

  // Adding city to the list and local storage
  addCity() {
    if (this.favouriteCityList.name) {
      this.cityService.addCity(this.favouriteCityList);
      this.addedCityListArray.push(this.favouriteCityList);
      this.hideButtonRemove = true;
      this.favouriteCityList = null;
    } else {
      this.toast(
        'warn',
        'Error adding city'
      );
    }
  }

  // Removing city from the list and local storage
  removeCity() {
    this.addedCityListArray.splice(this.removeId, 1);
    this.cityService.removeCity(this.removeIdFromLocalStorage);
    if (this.showActualWeather) {
      this.showActualWeather = false;
      this.showActualWeatherButtonLabel = (this.addedCityListArray.length > 0 ? WeatherButtonLabel.updateWeather : WeatherButtonLabel.showActualWeather);
    }
    if (this.showFiveDayWeather) {
      this.showFiveDayWeather = false;
      this.showFiveDayWeatherButtonLabel = (this.addedCityListArray.length > 0 ? WeatherButtonLabel.updateForecast : WeatherButtonLabel.showActualForecast);
    }
  }

  // Universal function for toast messages
  toast(severity: string, summary: string, detail?: string) {
    this.messageService.add({
      key: 'basic',
      severity,
      summary,
      detail
    });
  }

  // Removing all cities from the list and local storage
  removeAllCities() {
    if (this.showActualWeather) {
      this.showActualWeather = false;
      this.showActualWeatherButtonLabel = WeatherButtonLabel.showActualWeather;
    }
    if (this.showFiveDayWeather) {
      this.showFiveDayWeather = false;
      this.showFiveDayWeatherButtonLabel = WeatherButtonLabel.showActualForecast;
    }
    this.cityService.removeAllCities();
    this.addedCityListArray = [];
  }

  // Universal function for toast confirm message
  showConfirm(summary: string, id?: number, cityId?: number) {
    this.removeId = id;
    this.removeIdFromLocalStorage = cityId;
    this.messageService.clear();
    this.messageService.add({key: 'confirm', sticky: true, severity: 'warn', summary});

  }

  // Removing one city or whole cities
  onConfirm(type: string) {
    this.messageService.clear('confirm');
    if (type === 'city') {
      this.removeCity();
      if (!this.addedCityListArray.length) {
        this.hideButtonRemove = false;
      }
    } else {
      this.removeAllCities();
      this.hideButtonRemove = false;
    }
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 16;
        this.coordinates = {latitude: this.lat.toString(), longitude: this.lng.toString()};
        this.currentLocationSub = this.openWeatherService.getCurrentLocationWeatherInfo(this.coordinates, this.apiKey).subscribe(value => {
          if (this.addedCityListArray.length === 0 || !this.addedCityListArray.some(id => id.id === value.id)) {
            const currentCity = {
              id: value.id,
              name: value.name,
              country: value.sys.country,
              coord: {
                lon: this.lng,
                lat: this.lat
              }
            };
            this.addedCityListArray.push(currentCity);
            this.cityService.addCity(currentCity);
            this.showActualWeather = true;
            this.showActualWeatherButtonLabel = 'Close weather';
          } else {
            this.toast(
              'info',
              'You already got your current location'
            );
          }
        });
      });
    }
  }

  ngOnDestroy() {
    this.getApiKeySub.unsubscribe();
    if (this.citylistSub) {
      this.citylistSub.unsubscribe();
      this.currentLocationSub.unsubscribe();
    }
  }
}
