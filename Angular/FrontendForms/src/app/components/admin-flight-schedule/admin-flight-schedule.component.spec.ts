import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightScheduleComponent } from './admin-flight-schedule.component';

describe('AdminFlightScheduleComponent', () => {
  let component: AdminFlightScheduleComponent;
  let fixture: ComponentFixture<AdminFlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
