import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WeatherComponent} from './weather/weather.component';
import {WeatherModule} from './weather/weather.module';
import {PrimengModule} from './weather/primeng/primeng.module';
import {CityListService} from './service/city-list.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng/api';
import {ApiKeyService} from './service/api-key.service';
import {OpenweatherService} from './service/openweather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    WeatherModule,
    PrimengModule
  ],
  providers: [
    CityListService,
    MessageService,
    ApiKeyService,
    OpenweatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
