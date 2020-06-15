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
      {label: 'Main page', icon: 'pi pi-home', routerLink: '/home'},
      {label: 'Weather', icon: 'pi pi-list', routerLink: '/list'},
      {label: 'Settings', icon: 'pi pi-user', routerLink: '/settings'}
    ];
  }
}
