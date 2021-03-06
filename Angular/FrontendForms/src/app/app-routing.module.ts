import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddFlightComponent } from './components/admin-add-flight/admin-add-flight.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDeleteFlightComponent } from './components/admin-delete-flight/admin-delete-flight.component';
import { AdminFlightScheduleComponent } from './components/admin-flight-schedule/admin-flight-schedule.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserAddPassengerComponent } from './components/user-add-passenger/user-add-passenger.component';
import { UserCancellationComponent } from './components/user-cancellation/user-cancellation.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserFlightSearchComponent } from './components/user-flight-search/user-flight-search.component';
import { UserFlightSelectComponent } from './components/user-flight-select/user-flight-select.component';
import { UserForgotPasswordComponent } from './components/user-forgot-password/user-forgot-password.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserPaymentComponent } from './components/user-payment/user-payment.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserSeatSelectionComponent } from './components/user-seat-selection/user-seat-selection.component';
import { AdminService } from './services/admin.service';

const routes: Routes = [
  {path : "" , redirectTo : "home/flightSearch" ,pathMatch : "full"},
  {path : "home" , redirectTo : "home/flightSearch" ,pathMatch : "full"},
  {path : "adminDashboard" , redirectTo : "adminDashboard/flightSchedule" ,pathMatch : "full"},
  {path : "userDashboard" , redirectTo : "userDashboard/flightSearch" ,pathMatch : "full"},
  {
    path : "home" , component:HomeComponent,
    children: [
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
        path : "seatSelection" , component:UserSeatSelectionComponent
      },
    ]
  },
  {
    path : "userDashboard" , component:UserDashboardComponent,
    children: [
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
        path : "seatSelection" , component:UserSeatSelectionComponent
      },
      {
        path : "bookings" ,component : UserCancellationComponent
      }
    ]
  },
  {
    path : "loginPage/:id" , component:UserLoginComponent
  },
  {
    path : "register/:id" , component:UserRegistrationComponent
  },
  {
    path : "payment" , component:UserPaymentComponent
  },
  {
    path : "forgot/:id", component : UserForgotPasswordComponent
  },
  {
    path : "adminDashboard" , component:AdminDashboardComponent,
    children: [
      {
        path : "flightSchedule" , component: AdminFlightScheduleComponent
      },
      {
        path : "addFlight", component:AdminAddFlightComponent
      },
      {
        path : "deleteFlight", component:AdminDeleteFlightComponent
      },
    ]
  },
  {
    path : "**", component : NotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
