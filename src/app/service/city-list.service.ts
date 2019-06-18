import {Injectable} from '@angular/core';
import {CityList} from '../model/cityList';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private http: HttpClient) {
  }

  getlistOfCities() {
    return this.http.get<CityList>('../../assets/city.list.json');
  }

}
