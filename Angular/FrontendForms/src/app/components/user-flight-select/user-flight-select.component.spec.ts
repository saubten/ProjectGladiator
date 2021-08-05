import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFlightSelectComponent } from './user-flight-select.component';

describe('UserFlightSelectComponent', () => {
  let component: UserFlightSelectComponent;
  let fixture: ComponentFixture<UserFlightSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFlightSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFlightSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
