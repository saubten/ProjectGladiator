import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteFlightComponent } from './admin-delete-flight.component';

describe('AdminDeleteFlightComponent', () => {
  let component: AdminDeleteFlightComponent;
  let fixture: ComponentFixture<AdminDeleteFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
