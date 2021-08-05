import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMoneyToWalletComponent } from './user-add-money-to-wallet.component';

describe('UserAddMoneyToWalletComponent', () => {
  let component: UserAddMoneyToWalletComponent;
  let fixture: ComponentFixture<UserAddMoneyToWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddMoneyToWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMoneyToWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
