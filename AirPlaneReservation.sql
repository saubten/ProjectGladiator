CREATE DATABASE AirlineReservation
USE AirlineReservation
USE dbBank
DROP DATABASE AirlineReservation

CREATE TABLE Admins (
	AdminID nvarchar(20) NOT NULL,
	Password nvarchar(20) NOT NULL,
	FirstName nvarchar(20) NOT NULL,
	LastName nvarchar(20) NOT NULL,
	CONSTRAINT pk_Admin PRIMARY KEY (AdminID)
)

CREATE TABLE Airplanes (
	RegistrationNumber nvarchar(20) NOT NULL,
	EconomySeats int NOT NULL,
	BusinessSeats int NOT NULL,
	CONSTRAINT pk_Airlines PRIMARY KEY (RegistrationNumber)
)

CREATE TABLE Flights (
	RegistrationNumber nvarchar(20) NOT NULL,
	FlightNumber nvarchar(20) NOT NULL,
	FromLocation nvarchar(20) NOT NULL,
	ToLocation nvarchar(20) NOT NULL,
	DepartureDate date NOT NULL,
	DepartureTime time NOT NULL,
	ArrivalDate date NOT NULL,
	ArrivalTime time NOT NULL,
	EconomyPrice money NOT NULL,
	BusinessPrice money NOT NULL,
	AvailableEconomySeats int NOT NULL,
	AvailableBusinessSeats int NOT NULL,
	isCancelled bit NOT NULL,
	CONSTRAINT pk_Flights PRIMARY KEY (FlightNumber),
	CONSTRAINT fk_AirplanesFlights FOREIGN KEY (RegistrationNumber) REFERENCES Airplanes(RegistrationNumber) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE Users (
	UserID int NOT NULL IDENTITY (1,1),
	EmailID nvarchar(100) NOT NULL UNIQUE,
	Title nvarchar(5) NOT NULL,
	FirstName nvarchar(50) NOT NULL,
	LastName nvarchar(50) NOT NULL,
	Password nvarchar(100) NOT NULL,
	DOB date NOT NULL,
	PhoneNumber nvarchar(20) NOT NULL,
	WalletAmount money NOT NULL,
	CONSTRAINT pk_Users PRIMARY KEY (UserID),
)

CREATE TABLE TransactionTb (
	TransactionID int NOT NULL IDENTITY (1,1),
	UserID int NOT NULL,
	TransactionAmount money NOT NULL,
	DateOfTransaction datetime NOT NULL,
	CONSTRAINT pk_TransactionTb PRIMARY KEY (TransactionID),
	CONSTRAINT fk_UsersTransactionTb FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
)

DROP TABLE Bookings

CREATE TABLE Bookings (
	BookingID int NOT NULL IDENTITY (1,1),
	FlightNumber nvarchar(20) NOT NULL,
	TransactionID int NOT NULL,
	Passengers int NOT NULL,
	TicketFare money NOT NULL,
	isBusiness bit NOT NULL,
	isCancelled bit NOT NULL,
	isReturn bit NOT NULL,
	CONSTRAINT pk_Bookings PRIMARY KEY (BookingID),
	CONSTRAINT fk_FlightsBookings FOREIGN KEY (FlightNumber) REFERENCES Flights(FlightNumber) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_TransactionTbBookings FOREIGN KEY (TransactionID) REFERENCES TransactionTb(TransactionID) ON DELETE CASCADE ON UPDATE CASCADE,
)

CREATE TABLE RoundTrip (
	RoundTripID int NOT NULL IDENTITY (1,1),
	BookingID int NOT NULL,
	FlightNumber nvarchar(20) NOT NULL,
	TicketFare money NOT NULL,
	isCancelled bit NOT NULL,
	isBusiness bit NOT NULL,
	CONSTRAINT pk_RoundTrip PRIMARY KEY (RoundTripID),
	CONSTRAINT fk_BookingsRoundTrip FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_FlightsRoundTrip FOREIGN KEY (FlightNumber) REFERENCES Flights(FlightNumber),
)

CREATE TABLE FlightSeats(
	SeatID int NOT NULL IDENTITY (1,1),
	FlightNumber nvarchar(20) NOT NULL,
	SeatNo nvarchar(5) NOT NULL,
	isAvailable bit NOT NULL,
	CONSTRAINT pk_FlightSeats PRIMARY KEY (SeatID),
	CONSTRAINT fk_FlightsFlightSeats FOREIGN KEY (FlightNumber) REFERENCES Flights(FlightNumber) ON DELETE CASCADE ON UPDATE CASCADE,
)

CREATE TABLE Passegers (
	PassengerID int NOT NULL IDENTITY (1,1),
	BookingId int NOT NULL,
	OneWaySeatID int NOT NULL,
	RoundTripSeatID int DEFAULT(null),
	FirstName nvarchar(20) NOT NULL,
	LastName nvarchar(20) NOT NULL,
	Age int NOT NULL,
	PhoneNumber nvarchar(20) NOT NULL,
	CONSTRAINT pk_Passegers PRIMARY KEY (PassengerID),
	CONSTRAINT fk_BookingsPassegers FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_OSeatsPassegers FOREIGN KEY (OneWaySeatID) REFERENCES FlightSeats(SeatID) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_RSeatsPassegers FOREIGN KEY (RoundTripSeatID) REFERENCES FlightSeats(SeatID) ON DELETE NO ACTION ON UPDATE NO ACTION,
)






