USE AirlineReservation
Insert into Airplanes(RegistrationNumber,EconomySeats,BusinessSeats) Values ('AB123',138,20),('CD456',138,20),('EF789',138,20),('GH012',138,20),('IJ345',138,20)

Insert into Flights(RegistrationNumber,FlightNumber,FromLocation,ToLocation,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,EconomyPrice,BusinessPrice,AvailableEconomySeats,AvailableBusinessSeats,isCancelled) values
('AB123','K1234','Bangalore','Pune','2021-08-17','6:30 PM','2021-08-17','9:30 PM',2000,3000,138,20,0),---c
('EF789','K1235','Hyderabad','Mumbai','2021-08-17','5 PM','2021-08-17','8 PM',3000,5000,138,20,0),---c
('CD456','K1236','Puducherry','Delhi','2021-08-17','7:30 PM','2021-08-17','10:30 PM',2000,3000,138,20,0),
('GH012','K1237','Agra','Gwalior','2021-08-17','3:30 PM','2021-08-17','6:30 PM',2000,3000,138,20,0),
('AB123','K1238','Pune','Bangalore','2021-08-17','11:30 PM','2021-09-18','2:30 AM',2000,3000,138,20,0),---c
('EF789','K1239','Mumbai','Hyderabad','2021-08-17','10:30 PM','2021-08-18','1:30 AM',2000,3000,138,20,0),---c
('CD456','K1240','Delhi','Puducherry','2021-08-18','12:30 AM','2021-08-18','3:30 PM',2000,3000,138,20,0),
('GH012','K1241','Gwalior','Agra','2021-08-17','8:30 PM','2021-08-17','11:30 PM',2000,3000,138,20,0),
('IJ345','K1242','Jammu','Chennai','2021-08-18','6:30 AM','2021-08-18','10:30 AM',2000,3000,138,20,0),
('AB123','K1243','Bangalore','Agra','2021-08-18','10:30 PM','2021-08-19','1:30 AM',2000,3000,138,20,0),
('EF789','K1244','Delhi','Pune','2021-08-19','10:30 AM','2021-08-19','1:30 PM',2000,3000,138,20,0),
('CD456','K1245','Mumbai','Puducherry','2021-08-19','5:30 PM','2021-08-19','9:30 PM',2000,3000,138,20,0),
('GH012','K1246','Gwalior','Hyderabad','2021-08-19','10:30 PM','2021-08-19','1:30 AM',2000,3000,138,20,0),
('IJ345','K1247','Chennai','Jammu','2021-08-18','12:30 PM','2021-08-18','4:30 PM',2000,3000,138,20,0),
('AB123','K1248','Agra','Bangalore','2021-08-19','6:30 PM','2021-08-19','9:30 PM',2000,3000,138,20,0),
('EF789','K1249','Pune','Delhi','2021-08-20','11:30 PM','2021-08-21','1:30 AM',2000,3000,138,20,0),
('CD456','K1250','Puducherry','Mumbai','2021-08-20','2:30 PM','2021-08-20','5:30 PM',2000,3000,138,20,0),
('GH012','K1251','Hyderabad','Gwalior','2021-08-22','7:30 PM','2021-08-22','11:30 PM',2000,3000,138,20,0),
('AB123','K1252','Bangalore','Delhi','2021-08-22','11:30 PM','2021-08-23','2:30 AM',2000,3000,138,20,0),
('CD456','K1253','Jammu','Pudducherry','2021-08-24','12:30 PM','2021-08-24','4:30 PM',2000,3000,138,20,0),
('EF789','K1254','Hyderabad','Mumbai','2021-08-24','6:30 PM','2021-08-24','9:30 PM',2000,3000,138,20,0),
('GH012','K1255','Gwalior','Chennai','2021-08-25','2:30 PM','2021-08-25','5:30 PM',2000,3000,138,20,0),
('IJ345','K1256','Agra','Pune','2021-08-25','11:30 PM','2021-08-26','1:30 AM',2000,3000,138,20,0),
('AB123','K1257','Delhi','Bnagalore','2021-08-23','5:30 AM','2021-08-23','8:30 AM',2000,3000,138,20,0)



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


exec sp_flightSeatsInsert 'K1234'
exec sp_flightSeatsInsert 'K1235'
exec sp_flightSeatsInsert 'K1236'
exec sp_flightSeatsInsert 'K1237'
exec sp_flightSeatsInsert 'K1238'
exec sp_flightSeatsInsert 'K1239'
exec sp_flightSeatsInsert 'K1240'
exec sp_flightSeatsInsert 'K1241'
exec sp_flightSeatsInsert 'K1242'
exec sp_flightSeatsInsert 'K1243'
exec sp_flightSeatsInsert 'K1244'
exec sp_flightSeatsInsert 'K1245'
exec sp_flightSeatsInsert 'K1246'
exec sp_flightSeatsInsert 'K1247'
exec sp_flightSeatsInsert 'K1248'
exec sp_flightSeatsInsert 'K1249'
exec sp_flightSeatsInsert 'K1250'
exec sp_flightSeatsInsert 'K1251'
exec sp_flightSeatsInsert 'K1252'
exec sp_flightSeatsInsert 'K1253'
exec sp_flightSeatsInsert 'K1254'
exec sp_flightSeatsInsert 'K1255'
exec sp_flightSeatsInsert 'K1256'
exec sp_flightSeatsInsert 'K1257'


select * from Flights order by DepartureDate
select * from FlightSeats 
select * from Users
select * from Bookings
select * from Passegers
Select * from RoundTrip where BookingID = 1

Insert into Users(EmailID,Title,FirstName,LastName,Password,DOB,PhoneNumber,WalletAmount) values 
('saubten.mane@gmail.com','Mr','Saurabh','Mane','Saurabh@123','1999-05-13','996123490',50000),('keerthanrai16@gmail.com','Mr','Keerthan','Rai','Keerthan@123','2000-04-16','9653912348',20000)




select * from Airplanes