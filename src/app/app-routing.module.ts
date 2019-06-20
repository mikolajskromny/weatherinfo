import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoPageComponent} from './weather/info-page.component';
import {SettingsComponent} from './weather/settings/settings.component';
import {AddDeleteCityComponent} from './weather/add-delete-city/add-delete-city.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: InfoPageComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'list', component: AddDeleteCityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
