import {NgModule} from '@angular/core';
import {AutoCompleteModule, TabMenuModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    AutoCompleteModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    AutoCompleteModule,
    ToastModule
  ]
})
export class PrimengModule {
}
