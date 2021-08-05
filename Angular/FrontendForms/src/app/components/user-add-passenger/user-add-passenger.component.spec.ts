import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPassengerComponent } from './user-add-passenger.component';

describe('UserAddPassengerComponent', () => {
  let component: UserAddPassengerComponent;
  let fixture: ComponentFixture<UserAddPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddPassengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
