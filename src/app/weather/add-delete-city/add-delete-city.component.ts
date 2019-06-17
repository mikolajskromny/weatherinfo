import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CityModel} from '../../model/cityList';
import {CityListService} from '../../service/city-list.service';
import {OpenweatherService} from '../../service/openweather.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-add-delete-city',
  templateUrl: './add-delete-city.component.html',
  styleUrls: ['./add-delete-city.component.scss']
})
export class AddDeleteCityComponent implements OnInit, OnDestroy {

  citylistSub: Subscription;
  dataSource: CityModel[];
  cityListArray: CityModel[];
  addedCityListArray = [];
  columns: any[];
  loading: boolean;
  totalRecords: number;

  constructor(private city: CityListService,
              private openweather: OpenweatherService) {
  }

  ngOnInit() {
    this.getCityList();
    this.columns = [
      {field: 'city', header: 'Miasto'},
      {field: 'add', header: 'Dodaj'}];
  }
    // Getting list of cities into the array
  getCityList() {
    this.citylistSub = this.city.getlistOfCities().subscribe(value => {
      this.dataSource = value;
      this.totalRecords = this.dataSource.length;
    });
    this.addedCityListArray = [];

    this.openweather.getWeatherInfo('Poznan', '9b9da861fa27d666f076014dfb60418f').subscribe(value => {
      console.log(value);
    });
    this.loading = true;
  }
    // Function which filterd and slice our database
  lazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event);
    setTimeout(() => {
      if (this.dataSource) {
        this.loading = false;
        this.cityListArray = this.dataSource.slice(event.first, (event.first + event.rows));
        if (event.globalFilter) {
          this.cityListArray = this.dataSource.filter(value => value.name === event.globalFilter);
          console.log(event.globalFilter);
          console.log(this.cityListArray);
        }
      }
    }, 1000);
  }
    // Filtering list of cities and add to the another array
  addToFavourites(id: number) {
    this.addedCityListArray.push(this.dataSource.filter(value => value.id === id));
    console.log(this.addedCityListArray);
  }

  ngOnDestroy() {
    this.citylistSub.unsubscribe();
  }

}
