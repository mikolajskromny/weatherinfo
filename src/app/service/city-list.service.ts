import {Injectable} from '@angular/core';
import {ICityList, ICityModel} from '../model/cityList';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CityListService {
  public savedCityList: ICityModel[];

  constructor(private http: HttpClient) {
    this.savedCityList = this.getSavedCities();
  }

  getlistOfCities() {
    return this.http.get<ICityList>('../../assets/city.list.json');
  }

  private setLocalStorage(array: any) {
    localStorage.setItem('city', JSON.stringify(array));
  }

  public getSavedCities(): ICityModel[] {
    const localStorageItem = JSON.parse(localStorage.getItem('city'));
    return localStorageItem == null ? [] : localStorageItem;
  }

  addCity(city: ICityModel) {
    this.savedCityList.push(city);
    this.setLocalStorage(this.savedCityList);
  }

  removeCity(cityId: number) {
    this.savedCityList = this.getSavedCities().filter((id) => id.id !== cityId);
    this.setLocalStorage(this.savedCityList);
  }

  removeAllCities() {
    this.savedCityList = [];
    localStorage.removeItem('city');
  }

}
