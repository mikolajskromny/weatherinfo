import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WeatherComponent} from './weather/weather.component';
import {WeatherModule} from './weather/weather.module';
import {PrimengModule} from './weather/primeng/primeng.module';
import {CityListService} from './service/city-list.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherModule,
    PrimengModule
  ],
  providers: [CityListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
