using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MainWebAPI.Models
{
    public partial class AirlineReservationContext : DbContext
    {
        public AirlineReservationContext()
        {
        }

        public AirlineReservationContext(DbContextOptions<AirlineReservationContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Airplane> Airplanes { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Flight> Flights { get; set; }
        public virtual DbSet<FlightSeat> FlightSeats { get; set; }
        public virtual DbSet<Passeger> Passegers { get; set; }
        public virtual DbSet<RoundTrip> RoundTrips { get; set; }
        public virtual DbSet<TransactionTb> TransactionTbs { get; set; }
        public virtual DbSet<User> Users { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Server=LAPTOP-GDR4HNTG;Database=AirlineReservation;Trusted_Connection=True;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AI");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(e => e.AdminId)
                    .HasMaxLength(20)
                    .HasColumnName("AdminID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Airplane>(entity =>
            {
                entity.HasKey(e => e.RegistrationNumber)
                    .HasName("pk_Airlines");

                entity.Property(e => e.RegistrationNumber).HasMaxLength(20);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.FlightNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsBusiness).HasColumnName("isBusiness");

                entity.Property(e => e.IsCancelled).HasColumnName("isCancelled");

                entity.Property(e => e.IsReturn).HasColumnName("isReturn");

                entity.Property(e => e.TicketFare).HasColumnType("money");

                entity.Property(e => e.TransactionId).HasColumnName("TransactionID");

                entity.HasOne(d => d.FlightNumberNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.FlightNumber)
                    .HasConstraintName("fk_FlightsBookings");

                entity.HasOne(d => d.Transaction)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.TransactionId)
                    .HasConstraintName("fk_TransactionTbBookings");
            });

            modelBuilder.Entity<Flight>(entity =>
            {
                entity.HasKey(e => e.FlightNumber)
                    .HasName("pk_Flights");

                entity.Property(e => e.FlightNumber).HasMaxLength(20);

                entity.Property(e => e.ArrivalDate).HasColumnType("date");

                entity.Property(e => e.BusinessPrice).HasColumnType("money");

                entity.Property(e => e.DepartureDate).HasColumnType("date");

                entity.Property(e => e.EconomyPrice).HasColumnType("money");

                entity.Property(e => e.FromLocation)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsCancelled).HasColumnName("isCancelled");

                entity.Property(e => e.RegistrationNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.ToLocation)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.RegistrationNumberNavigation)
                    .WithMany(p => p.Flights)
                    .HasForeignKey(d => d.RegistrationNumber)
                    .HasConstraintName("fk_AirplanesFlights");
            });

            modelBuilder.Entity<FlightSeat>(entity =>
            {
                entity.HasKey(e => e.SeatId)
                    .HasName("pk_FlightSeats");

                entity.Property(e => e.SeatId).HasColumnName("SeatID");

                entity.Property(e => e.FlightNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsAvailable).HasColumnName("isAvailable");

                entity.Property(e => e.SeatNo)
                    .IsRequired()
                    .HasMaxLength(5);

                entity.HasOne(d => d.FlightNumberNavigation)
                    .WithMany(p => p.FlightSeats)
                    .HasForeignKey(d => d.FlightNumber)
                    .HasConstraintName("fk_FlightsFlightSeats");
            });

            modelBuilder.Entity<Passeger>(entity =>
            {
                entity.HasKey(e => e.PassengerId)
                    .HasName("pk_Passegers");

                entity.Property(e => e.PassengerId).HasColumnName("PassengerID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.OneWaySeatId).HasColumnName("OneWaySeatID");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.RoundTripSeatId).HasColumnName("RoundTripSeatID");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Passegers)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("fk_BookingsPassegers");

                entity.HasOne(d => d.OneWaySeat)
                    .WithMany(p => p.PassegerOneWaySeats)
                    .HasForeignKey(d => d.OneWaySeatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_OSeatsPassegers");

                entity.HasOne(d => d.RoundTripSeat)
                    .WithMany(p => p.PassegerRoundTripSeats)
                    .HasForeignKey(d => d.RoundTripSeatId)
                    .HasConstraintName("fk_RSeatsPassegers");
            });

            modelBuilder.Entity<RoundTrip>(entity =>
            {
                entity.ToTable("RoundTrip");

                entity.Property(e => e.RoundTripId).HasColumnName("RoundTripID");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.FlightNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsCancelled).HasColumnName("isCancelled");

                entity.Property(e => e.TicketFare).HasColumnType("money");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.RoundTrips)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("fk_BookingsRoundTrip");

                entity.HasOne(d => d.FlightNumberNavigation)
                    .WithMany(p => p.RoundTrips)
                    .HasForeignKey(d => d.FlightNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_FlightsRoundTrip");
            });

            modelBuilder.Entity<TransactionTb>(entity =>
            {
                entity.HasKey(e => e.TransactionId)
                    .HasName("pk_TransactionTb");

                entity.ToTable("TransactionTb");

                entity.Property(e => e.TransactionId).HasColumnName("TransactionID");

                entity.Property(e => e.DateOfTransaction).HasColumnType("datetime");

                entity.Property(e => e.TransactionAmount).HasColumnType("money");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TransactionTbs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_UsersTransactionTb");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.EmailId, "UQ__Users__7ED91AEED515D991")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("DOB");

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("EmailID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(5);

                entity.Property(e => e.WalletAmount).HasColumnType("money");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
