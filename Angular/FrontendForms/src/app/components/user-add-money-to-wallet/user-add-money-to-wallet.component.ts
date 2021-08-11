import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add-money-to-wallet',
  templateUrl: './user-add-money-to-wallet.component.html',
  styleUrls: ['./user-add-money-to-wallet.component.css']
})
export class UserAddMoneyToWalletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addMoneyToWalletForm = new FormGroup({
    addMoneyToWallet :new FormControl('',[Validators.required]),
  })
  

  submit(){
    alert(this.addMoneyToWalletForm.value + " is added to your account")
  }

  get f(){
    return this.addMoneyToWalletForm.controls;
  }
}
