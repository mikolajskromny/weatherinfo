import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualForecastComponent } from './actual-forecast.component';

describe('ActualForecastComponent', () => {
  let component: ActualForecastComponent;
  let fixture: ComponentFixture<ActualForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
