import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityModel} from '../../model/cityList';
import {CityListService} from '../../service/city-list.service';
import {OpenweatherService} from '../../service/openweather.service';

@Component({
  selector: 'app-add-delete-city',
  templateUrl: './add-delete-city.component.html',
  styleUrls: ['./add-delete-city.component.scss']
})
export class AddDeleteCityComponent implements OnInit, OnDestroy {

  citylistSub: Subscription;
  addedCityListArray: CityModel[];
  cityListArray: string[];

  constructor(private city: CityListService) {
  }

  ngOnInit() {
  }

  search(event) {
    const queryy = event.query;
    this.citylistSub = this.city.getlistOfCities().subscribe(data => {
      this.cityListArray = this.filterCities(queryy, data);
    }, error1 => {
      console.log(error1);
      this.citylistSub.unsubscribe();
    });
  }

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

  ngOnDestroy() {
    if (this.citylistSub) {
      this.citylistSub.unsubscribe();
    }
  }

}
