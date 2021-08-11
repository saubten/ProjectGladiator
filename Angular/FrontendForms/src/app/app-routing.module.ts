import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddPassengerComponent } from './components/user-add-passenger/user-add-passenger.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserFlightSearchComponent } from './components/user-flight-search/user-flight-search.component';
import { UserFlightSelectComponent } from './components/user-flight-select/user-flight-select.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserPaymentComponent } from './components/user-payment/user-payment.component';
import { UserSeatSelectionComponent } from './components/user-seat-selection/user-seat-selection.component';

const routes: Routes = [
  {
    path : "flightSearch" , component: UserFlightSearchComponent
  },
  {
    path : "flightSelect", component:UserFlightSelectComponent
  },
  {
    path : "addPassenger", component:UserAddPassengerComponent
  },
  {
    path : "userDashboard" , component:UserDashboardComponent,
    children: [
      {
        path : "flightSearch" , component: UserFlightSearchComponent
      }
    ]
  },
  {
    path : "loginPage" , component:UserLoginComponent
  },
  {
    path : "seatSelection" , component:UserSeatSelectionComponent
  },
  {
    path : "payment" , component:UserPaymentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
