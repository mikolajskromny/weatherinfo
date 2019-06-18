import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityModel} from '../../model/cityList';
import {CityListService} from '../../service/city-list.service';
import {MessageService} from 'primeng/api';

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

  constructor(private city: CityListService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.showWeatherButtonLabel = 'Pokaż aktualną pogodę';
  }

  // Function which pass event to the filtering function
  search(event) {
    if (this.showActualWeather) {
      this.showActualWeather = false;
      this.showWeatherButtonLabel = 'Zaktualizuj pogodę';
    }
    const queryy = event.query;
    this.citylistSub = this.city.getlistOfCities().subscribe(data => {
      this.cityListArray = this.filterCities(queryy, data);
    });
    console.log(this.addedCityListArray);

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

  showActualWeatherForecast() {
    if (this.addedCityListArray) {
      this.showActualWeather = !this.showActualWeather;
      if (!this.showActualWeather) {
        this.showWeatherButtonLabel = 'Pokaż aktualną pogodę';
      } else {
        this.showWeatherButtonLabel = 'Zamknij pogodę';
      }
    } else {
      this.emptyArrayInfo();
    }
  }

  emptyArrayInfo() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Nie zostały wybrane żadne miasta.',
      detail: 'Zacznij wpisywać swoje miasto i kliknij na nie.'
    });
  }

  ngOnDestroy() {
    if (this.citylistSub) {
      this.citylistSub.unsubscribe();
    }
  }

}
