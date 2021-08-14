import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserFlightSearchComponent } from './components/user-flight-search/user-flight-search.component';
import { UserFlightSelectComponent } from './components/user-flight-select/user-flight-select.component';
import { UserAddPassengerComponent } from './components/user-add-passenger/user-add-passenger.component';
import { UserPaymentComponent } from './components/user-payment/user-payment.component';
import { UserAddMoneyToWalletComponent } from './components/user-add-money-to-wallet/user-add-money-to-wallet.component';
import { UserCancellationComponent } from './components/user-cancellation/user-cancellation.component';
import { UserForgotPasswordComponent } from './components/user-forgot-password/user-forgot-password.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminAddFlightComponent } from './components/admin-add-flight/admin-add-flight.component';
import { AdminDeleteFlightComponent } from './components/admin-delete-flight/admin-delete-flight.component';
import { UserSeatSelectionComponent } from './components/user-seat-selection/user-seat-selection.component';
import { HomeComponent } from './components/home/home.component';
import { FlightService } from './services/flights.service';
import { AdminFlightScheduleComponent } from './components/admin-flight-schedule/admin-flight-schedule.component';
import { SeatService } from './services/seats.service';
import { AdminService } from './services/admin.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserServices } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserFlightSearchComponent,
    UserFlightSelectComponent,
    UserAddPassengerComponent,
    UserPaymentComponent,
    UserAddMoneyToWalletComponent,
    UserCancellationComponent,
    UserForgotPasswordComponent,
    AdminDashboardComponent,
    AdminAddFlightComponent,
    AdminDeleteFlightComponent,
    UserSeatSelectionComponent,
    HomeComponent,
    AdminFlightScheduleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [FlightService,SeatService,AdminService,UserServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
