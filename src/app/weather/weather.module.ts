import {NgModule} from '@angular/core';
import {AddDeleteCityComponent} from './add-delete-city/add-delete-city.component';
import {PrimengModule} from './primeng/primeng.module';
import {HttpClientModule} from '@angular/common/http';
import {SettingsComponent} from './settings/settings.component';
import {CommonModule} from '@angular/common';
import { ActualForecastComponent } from './add-delete-city/actual-forecast/actual-forecast.component';
import { FiveDayForecastComponent } from './add-delete-city/five-day-forecast/five-day-forecast.component';


@NgModule({
  declarations: [
    AddDeleteCityComponent,
    SettingsComponent,
    ActualForecastComponent,
    FiveDayForecastComponent
  ],
  imports: [
    PrimengModule,
    HttpClientModule,
    CommonModule
  ]
})
export class WeatherModule {
}
