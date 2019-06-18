import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weatherinfo';
  items: MenuItem[];

  ngOnInit() {
    this.menuItems();
  }

  menuItems() {
    this.items = [
      {label: 'Strona Główna', icon: 'pi pi-home', routerLink: '/home'},
      {label: 'Ustawienia', icon: 'pi pi-user', routerLink: '/settings'},
      {label: 'Lista miast', icon: 'pi pi-list', routerLink: '/list'}
    ];
  }
}
