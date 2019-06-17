import {NgModule} from '@angular/core';
import {AutoCompleteModule, PickListModule, TabMenuModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    PickListModule,
    VirtualScrollerModule,
    TableModule,
    AutoCompleteModule
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TabMenuModule,
    PickListModule,
    VirtualScrollerModule,
    TableModule,
    AutoCompleteModule
  ]
})
export class PrimengModule {
}
