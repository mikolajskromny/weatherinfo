import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityModel} from '../../model/cityList';
import {CityListService} from '../../service/city-list.service';
import {MessageService} from 'primeng/api';
import {ApiKeyService} from '../../service/api-key.service';

@Component({
  selector: 'app-add-delete-city',
  templateUrl: './add-delete-city.component.html',
  styleUrls: ['./add-delete-city.component.scss']
})
export class AddDeleteCityComponent implements OnInit, OnDestroy {

  citylistSub: Subscription;
  addedCityListArray: CityModel[];
  cityListArray: string[];
  showActualWeather = false;
  showWeatherButtonLabel: string;
  favouriteCityList: CityModel;
  removeId: number;
  removeIdFromLocalStorage: number;
  private getApiKeySub: Subscription;
  disabledButtonShowWeather = true;
  hideButtonRemove = false;

  constructor(private cityService: CityListService,
              private messageService: MessageService,
              private apiKeyService: ApiKeyService) {
  }

  ngOnInit() {
    this.showWeatherButtonLabel = 'Pokaż aktualną pogodę';

    // Checking if api key is valid and disabling button if not
    this.getApiKeySub = this.apiKeyService.getApiKey().subscribe(value => {
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
      this.showWeatherButtonLabel = 'Zaktualizuj pogodę';
    }
    const queryy = event.query;
    this.citylistSub = this.cityService.getlistOfCities().subscribe(data => {
      this.cityListArray = this.filterCities(queryy, data);
    });
  }

  // Filtering function
  filterCities(query, cities: CityModel[]): any[] {
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
    if (this.addedCityListArray) {
      this.showActualWeather = !this.showActualWeather;
      if (!this.showActualWeather) {
        this.showWeatherButtonLabel = 'Pokaż aktualną pogodę';
      } else {
        this.showWeatherButtonLabel = 'Zamknij pogodę';
      }
    } else {
      this.toast(
        'warn',
        'Nie zostały wybrane żadne miasta.',
        'Zacznij wpisywać swoje miasto i kliknij na nie.'
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
        'Błąd dodawania miasta'
      );
    }
  }
  // Removing city from the list and local storage
  removeCity() {
    if (this.showActualWeather) {
      this.showActualWeather = false;
      this.showWeatherButtonLabel = 'Zaktualizuj pogodę';
    }
    this.addedCityListArray.splice(this.removeId, 1);
    this.cityService.removeCity(this.removeIdFromLocalStorage);
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

  ngOnDestroy() {
    this.getApiKeySub.unsubscribe();
    if (this.citylistSub) {
      this.citylistSub.unsubscribe();
    }
  }
}
