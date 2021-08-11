import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeatSelectionComponent } from './user-seat-selection.component';

describe('UserSeatSelectionComponent', () => {
  let component: UserSeatSelectionComponent;
  let fixture: ComponentFixture<UserSeatSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSeatSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
