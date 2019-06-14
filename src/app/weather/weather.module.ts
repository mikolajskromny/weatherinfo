import { NgModule } from '@angular/core';
import {ShowWeatherComponent} from './show-weather/show-weather.component';
import {AddDeleteCityComponent} from './add-delete-city/add-delete-city.component';
import {PrimengModule} from './primeng/primeng.module';
import {HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: 'settings',
  component: SettingsComponent
}

];

@NgModule({
  declarations: [
    ShowWeatherComponent,
    AddDeleteCityComponent,
    SettingsComponent
  ],
  imports: [
    PrimengModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class WeatherModule { }
