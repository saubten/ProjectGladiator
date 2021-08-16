Use AirlineReservation


Insert into Users(EmailID,Title,FirstName,LastName,Password,DOB,PhoneNumber,WalletAmount) values ('koushika@gmail.com','Ms','Koushika','Bandineni','koushi@1','2000-03-13','7780692722',1000),
('saurabh@gmail.com','Mr','Saurabh','Mane','Saurab@2','1999-05-13','996123490',500),('keerthan@gmail.com','Mr','Keerthan','Rai','keerthan@1','2000-04-16','9653912348',2000),
('amit@gmail.com','Mr','Amit','Tiwari','amit@1','1998-05-29','9375918328',1000),('siddharth@gmail.com','Mr','Siddhartha','Ray','siddha@1','1994-04-16','7780692722',200)

update Users set PhoneNumber='9623871237' where UserID=14
select * from Passegers
delete from Users where LastName = 'Mane'


Insert into Airplanes(RegistrationNumber,EconomySeats,BusinessSeats) Values ('AB123',138,20),('CD456',138,20),('EF789',138,20),('GH012',138,20),('IJ345',138,20)

select * from Airplanes

Select * from Users

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('CD456','B5678','Pune','Bangalore','2021-09-25','4:30 PM','2021-09-25','6:30 PM',1000,3000,138,20,0),
('AB123','C1239','Chennai','Delhi','2021-10-26','5:30 PM','2021-10-26','10:30 PM',2000,4000,138,20,0),
('EF789','D6543','Puducherry','Hyderabad','2021-09-10','4:30 AM','2021-09-10','5:30 AM',1500,2500,138,20,0),
('GH012','E5678','Agra','Gwalior','2021-11-02','4:30 PM','2021-11-02','6:30 PM',3000,5000,138,20,0),
('IJ345','H9876','Jammu','Delhi','2021-08-26','1:30 PM','2021-08-26','3:30 PM',4000,6000,138,20,0),
('CD456','A1234','Mumbai','Hyderabad','2021-08-21','2 PM','2021-09-22','4 PM',3000,5000,138,20,0)

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('EF789','Z1234','Chennai','Delhi','2021-08-30','1:30 PM','2021-08-30','6:30 PM',4000,5000,138,20,0),
('CD456','X2345','Chennai','Delhi','2021-09-02','2:30 PM','2021-09-02','7:30 PM',3500,5000,138,20,0)

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('AB123','Y5678','Delhi','Jammu','2021-08-28','4:30 PM','2021-08-28','8:30 PM',2500,4000,138,20,0)

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('IJ345','P5678','Delhi','Jammu','2021-08-30','9:00 AM','2021-08-30','1:00 PM',3000,7000,138,20,0)

update Flights set DepartureDate = '2021-10-26' where FlightNumber='Z1234'
update Flights set DepartureDate = '2021-10-26' where FlightNumber='X2345'


Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('EF789','J9876','Jammu','Delhi','2021-08-26','3:30 PM','2021-08-26','6:30 PM',3000,5000,130,50,0)



Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('AB123','K1234','Bangalore','Pune','2021-09-28','6:30 PM','2021-09-28','9:30 PM',2000,3000,138,20,0),
('EF789','J4567','Hyderabad','Mumbai','2021-08-26','5 PM','2021-09-26','8 PM',3000,5000,138,20,0)

update Flights set DepartureDate='2021-08-28' where FlightNumber='P5678'

select * from Flights order by DepartureDate

Insert into TransactionTb(UserID,TransactionAmount,DateOfTransaction) values ( 10,5500,2021-08-20),(11,6000,2021-08-13),(12,5000,2021-08-14),(13,10000,2021-08-17),(14,2000,2021-08-13)

update TransactionTb set TransactionAmount = 8000 where UserID=14
update TransactionTb set TransactionAmount = 18000 where UserID=10

select * from TransactionTb

Insert into Bookings(FlightNumber,TransactionID,EconomyPassengers,BusinessPassengers,TicketFare,isCancelled,isReturn) values
('A1234',10,3,0,9000,0,1),('C1239',11,3,0,6000,0,0),('E5678',12,0,1,5000,0,0),('H9876',13,1,1,10000,0,0),('B5678',14,2,0,2000,0,1)

select * from Bookings

Insert into RoundTrip(BookingID,FlightNumber,EconomyPassenger,BusinessPassenger,TicketFare,isCancelled) values (14,'J4567',3,0,9000,0),(18,'K1234',0,3,6000,0)

select * from RoundTrip

Insert into Passegers(BookingId,FirstName,LastName,Age,PhoneNumber) values (14,'Koushika','Bandineni',21,'7780692722'),(14,'Madhav','Chowdary',24,'9441175101'),(14,'Deeksha','Bandineni',18,'7651234876'),
(15,'Saurabh','Mane',22,'996123490'),(15,'Deepti','Mane',24,'8292818938'),(15,'Simran','Rai',21,'7623997629'),
(16,'Keerthan','Rai',21,'9653912348'),
(17,'Amit','Tiwari',23,'9375918328'),(17,'Priya','Tiwari',23,'972381736'),
(18,'Siddhartha','Ray',27,'9623871237'),(18,'James','Rahul',22,'8837428269')

select * from Passegers

Insert into Admins (AdminID,Password,FirstName,LastName) values ('Amar12', 'Amar@1','Aamar','Singh'),
('Nikhil34','Nikhil123','Nikhil','Kotha'),('Deepika@1','Deepika@12','Deepika','Rai'),
('Nishidha256','Nishidha@13','Nishidha','Chowdary'),('Shivangi45','Shiva@123','Shivangi','Gupta')

select * from Admins

/* all tables */


select * from Airplanes
select * from Users
select * from Flights
select * from TransactionTb
select * from Bookings
select * from RoundTrip
select * from Passegers
select * from Admins

create proc sp_flightsearch(@FromLocation nvarchar(20), @ToLocation nvarchar(20), @DepartureDate date)
as
begin
select * from Flights
where FromLocation = @FromLocation and ToLocation = @ToLocation and DepartureDate=@DepartureDate
end

exec sp_flightsearch 'Mumbai','Hyderabad','2021-08-21'

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('EF789','J9876','Jammu','Delhi','2021-08-26','3:30 PM','2021-08-26','6:30 PM',3000,5000,138,20,0)
Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('IJ345','S3456','Delhi','Jammu','2021-08-28','9:00 AM','2021-08-30','1:00 PM',3000,7000,138,20,0)


create proc sp_flightSeatsInsert(@FlightNumber nvarchar(20))
as
begin
Insert into FlightSeats (FlightNumber,SeatNo,isAvailable) values
(@FlightNumber,'1A',1),(@FlightNumber,'1B',1),(@FlightNumber,'1C',1),(@FlightNumber,'1D',1),
(@FlightNumber,'2A',1),(@FlightNumber,'2B',1),(@FlightNumber,'2C',1),(@FlightNumber,'2D',1),
(@FlightNumber,'3A',1),(@FlightNumber,'3B',1),(@FlightNumber,'3C',1),(@FlightNumber,'3D',1),
(@FlightNumber,'4A',1),(@FlightNumber,'4B',1),(@FlightNumber,'4C',1),(@FlightNumber,'4D',1),
(@FlightNumber,'5A',1),(@FlightNumber,'5B',1),(@FlightNumber,'5C',1),(@FlightNumber,'5D',1),
(@FlightNumber,'6E',1),(@FlightNumber,'6F',1),(@FlightNumber,'6G',1),(@FlightNumber,'6H',1),(@FlightNumber,'6I',1),(@FlightNumber,'6J',1),
(@FlightNumber,'7E',1),(@FlightNumber,'7F',1),(@FlightNumber,'7G',1),(@FlightNumber,'7H',1),(@FlightNumber,'7I',1),(@FlightNumber,'7J',1),
(@FlightNumber,'8E',1),(@FlightNumber,'8F',1),(@FlightNumber,'8G',1),(@FlightNumber,'8H',1),(@FlightNumber,'8I',1),(@FlightNumber,'8J',1),
(@FlightNumber,'9E',1),(@FlightNumber,'9F',1),(@FlightNumber,'9G',1),(@FlightNumber,'9H',1),(@FlightNumber,'9I',1),(@FlightNumber,'9J',1),
(@FlightNumber,'10E',1),(@FlightNumber,'10F',1),(@FlightNumber,'10G',1),(@FlightNumber,'10H',1),(@FlightNumber,'10I',1),(@FlightNumber,'10J',1),
(@FlightNumber,'11E',1),(@FlightNumber,'11F',1),(@FlightNumber,'11G',1),(@FlightNumber,'11H',1),(@FlightNumber,'11I',1),(@FlightNumber,'11J',1),
(@FlightNumber,'12E',1),(@FlightNumber,'12F',1),(@FlightNumber,'12G',1),(@FlightNumber,'12H',1),(@FlightNumber,'12I',1),(@FlightNumber,'12J',1),
(@FlightNumber,'13E',1),(@FlightNumber,'13F',1),(@FlightNumber,'13G',1),(@FlightNumber,'13H',1),(@FlightNumber,'13I',1),(@FlightNumber,'13J',1),
(@FlightNumber,'14E',1),(@FlightNumber,'14F',1),(@FlightNumber,'14G',1),(@FlightNumber,'14H',1),(@FlightNumber,'14I',1),(@FlightNumber,'14J',1),
(@FlightNumber,'15E',1),(@FlightNumber,'15F',1),(@FlightNumber,'15G',1),(@FlightNumber,'15H',1),(@FlightNumber,'15I',1),(@FlightNumber,'15J',1),
(@FlightNumber,'16E',1),(@FlightNumber,'16F',1),(@FlightNumber,'16G',1),(@FlightNumber,'16H',1),(@FlightNumber,'16I',1),(@FlightNumber,'16J',1),
(@FlightNumber,'17E',1),(@FlightNumber,'17F',1),(@FlightNumber,'17G',1),(@FlightNumber,'17H',1),(@FlightNumber,'17I',1),(@FlightNumber,'17J',1),
(@FlightNumber,'18E',1),(@FlightNumber,'18F',1),(@FlightNumber,'18G',1),(@FlightNumber,'18H',1),(@FlightNumber,'18I',1),(@FlightNumber,'18J',1),
(@FlightNumber,'19E',1),(@FlightNumber,'19F',1),(@FlightNumber,'19G',1),(@FlightNumber,'19H',1),(@FlightNumber,'19I',1),(@FlightNumber,'19J',1),
(@FlightNumber,'20E',1),(@FlightNumber,'20F',1),(@FlightNumber,'20G',1),(@FlightNumber,'20H',1),(@FlightNumber,'20I',1),(@FlightNumber,'20J',1),
(@FlightNumber,'21E',1),(@FlightNumber,'21F',1),(@FlightNumber,'21G',1),(@FlightNumber,'21H',1),(@FlightNumber,'21I',1),(@FlightNumber,'21J',1),
(@FlightNumber,'22E',1),(@FlightNumber,'22F',1),(@FlightNumber,'22G',1),(@FlightNumber,'22H',1),(@FlightNumber,'22I',1),(@FlightNumber,'22J',1),
(@FlightNumber,'23E',1),(@FlightNumber,'23F',1),(@FlightNumber,'23G',1),(@FlightNumber,'23H',1),(@FlightNumber,'23I',1),(@FlightNumber,'23J',1),
(@FlightNumber,'24E',1),(@FlightNumber,'24F',1),(@FlightNumber,'24G',1),(@FlightNumber,'24H',1),(@FlightNumber,'24I',1),(@FlightNumber,'24J',1),
(@FlightNumber,'25E',1),(@FlightNumber,'25F',1),(@FlightNumber,'25G',1),(@FlightNumber,'25H',1),(@FlightNumber,'25I',1),(@FlightNumber,'25J',1),
(@FlightNumber,'26E',1),(@FlightNumber,'26F',1),(@FlightNumber,'26G',1),(@FlightNumber,'26H',1),(@FlightNumber,'26I',1),(@FlightNumber,'26J',1),
(@FlightNumber,'27E',1),(@FlightNumber,'27F',1),(@FlightNumber,'27G',1),(@FlightNumber,'27H',1),(@FlightNumber,'27I',1),(@FlightNumber,'27J',1),
(@FlightNumber,'28E',1),(@FlightNumber,'28F',1),(@FlightNumber,'28G',1),(@FlightNumber,'28H',1),(@FlightNumber,'28I',1),(@FlightNumber,'28J',1)
end

select * from FlightSeats where FlightNumber in ('K1234','B5678')
select * from Flights where FlightNumber in ('K1234','B5678') order by DepartureDate 
sp_flightSeatsInsert 'K1234'

update Flights set AvailableBusinessSeats = 20 where AvailableBusinessSeats <> 20
update Flights set AvailableEconomySeats = 138 where AvailableEconomySeats <> 138
alter table RoundTrip add isBusiness bit

update FlightSeats set isAvailable = 1 where isAvailable = 0

insert into TransactionTb(UserID,TransactionAmount) values (2,8000),(2,9000),(3,4000),(4,5000),(2,4000),(3,2500)


alter table TransactionTb Add constraint DF_Transaction default(GETDATE()) for DateOfTransaction 

select * from Users
select * from Flights
select * from TransactionTb
select * from Bookings
select * from RoundTrip
select * from Passegers

insert into Bookings(FlightNumber,TransactionID,Passengers,TicketFare,isBusiness,isCancelled,isReturn) values
('K1234',1,3,3000,1,0,0),
('J9876',2,2,4000,1,0,1),
('P5678',3,4,4000,0,0,0),
('K1234',4,3,6000,0,0,1),
('H9876',5,1,1500,0,0,0),
('D6543',6,1,4000,1,0,1)

insert into RoundTrip (BookingID,FlightNumber,TicketFare,isBusiness,isCancelled) values
(2,'S3456',2000,0,0),
(4,'D6543',3000,1,0),
(6,'H9876',4000,0,0)

drop table RoundTrip


select * from FlightSeats

insert into Admins (AdminID , Password,FirstName , LastName) values 
('admin.123@gmail.com','admin123','John','Doe'),
('admin.456@gmail.com','admin456','David','Friss'),
('admin.789@gmail.com','admin789','Eren','Yeager')

delete from Passegers
delete from Bookings
delete from RoundTrip
delete from TransactionTb


alter table Flights Add constraint DF_isCancellation default(0) for isCancelled


Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('AB123','L9532','Bangalore','Pune','2021-07-28','6:30 PM','2021-09-28','9:30 PM',2000,3000,138,20,0),
('AB123','K9532','Mumbai','Pune','2021-08-16','8:00 PM','2021-09-28','9:30 PM',2000,3000,138,20,0)

insert into TransactionTb(UserID,TransactionAmount) values (8,2000),(8,2000)

insert into Bookings(FlightNumber,TransactionID,Passengers,TicketFare,isBusiness,isCancelled,isReturn) values
('L9532',61,1,2000,1,0,0),
('K9532',62,1,2000,1,0,0)