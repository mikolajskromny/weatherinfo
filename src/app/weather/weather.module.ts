import {NgModule} from '@angular/core';
import {ShowWeatherComponent} from './show-weather/show-weather.component';
import {AddDeleteCityComponent} from './add-delete-city/add-delete-city.component';
import {PrimengModule} from './primeng/primeng.module';
import {HttpClientModule} from '@angular/common/http';
import {SettingsComponent} from './settings/settings.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    ShowWeatherComponent,
    AddDeleteCityComponent,
    SettingsComponent
  ],
  imports: [
    PrimengModule,
    HttpClientModule,
    CommonModule
  ]
})
export class WeatherModule {
}
