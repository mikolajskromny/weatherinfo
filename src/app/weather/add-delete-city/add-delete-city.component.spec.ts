import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeleteCityComponent } from './add-delete-city.component';

describe('AddDeleteCityComponent', () => {
  let component: AddDeleteCityComponent;
  let fixture: ComponentFixture<AddDeleteCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeleteCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeleteCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
