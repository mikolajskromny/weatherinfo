import {NgModule} from '@angular/core';
import {AutoCompleteModule, InputSwitchModule, TabMenuModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    AutoCompleteModule,
    ToastModule,
    InputSwitchModule,
    TooltipModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    AutoCompleteModule,
    ToastModule,
    InputSwitchModule,
    TooltipModule
  ]
})
export class PrimengModule {
}
