import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    AccordionModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ]
})
export class PrimengModule { }
