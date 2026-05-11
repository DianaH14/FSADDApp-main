using BookingApi.Data;
using BookingApi.Entities;
using BookingApi.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<Booking>> GetAllAsync()
    {
        return await _context.Bookings.OrderByDescending(b => b.Date).ThenBy(b => b.Time).ToListAsync();
    }

    public async Task<Booking?> GetByIdAsync(Guid id)
    {
        return await _context.Bookings.FindAsync(id);
    }

    public async Task<IList<Booking>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Bookings.Where(b => b.UserId == userId).OrderByDescending(b => b.Date).ThenBy(b => b.Time).ToListAsync();
    }

    public async Task AddAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
    }

    public void Update(Booking booking)
    {
        _context.Bookings.Update(booking);
    }

    public void Remove(Booking booking)
    {
        _context.Bookings.Remove(booking);
    }

    public async Task<bool> HasConflictAsync(DateOnly date, TimeOnly time, string location, Guid? excludeBookingId = null)
    {
        return await _context.Bookings.AnyAsync(b => b.Date == date
            && b.Time == time
            && b.Location.ToLower() == location.ToLower()
            && (excludeBookingId == null || b.Id != excludeBookingId)
            && b.Status != BookingStatus.Cancelled);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
