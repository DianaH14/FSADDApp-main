using BookingApi.Entities;
using BookingApi.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.Role).HasMaxLength(50);
            entity.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.Property(b => b.Status).HasConversion<string>();
            entity.Property(b => b.FullName).IsRequired().HasMaxLength(150);
            entity.Property(b => b.Email).IsRequired().HasMaxLength(150);
            entity.Property(b => b.Location).IsRequired().HasMaxLength(200);
            entity.Property(b => b.SessionType).IsRequired().HasMaxLength(100);
            entity.Property(b => b.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.Property(r => r.Username).IsRequired().HasMaxLength(100);
            entity.Property(r => r.Rating).IsRequired();
            entity.Property(r => r.Comment).IsRequired().HasMaxLength(1000);
            entity.Property(r => r.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        var adminUser = new User
        {
            Id = Guid.NewGuid(),
            Name = "Admin Photographer",
            Email = "admin@fsadd.com",
            PasswordHash = PasswordHasher.Hash("Admin123!"),
            Role = UserRoles.Admin,
            CreatedAt = DateTime.UtcNow
        };

        modelBuilder.Entity<User>().HasData(adminUser);
    }
}
