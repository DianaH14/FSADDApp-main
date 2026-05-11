using BookingApi.Entities;

namespace BookingApi.Interfaces;

public interface IBookingRepository
{
    Task<IList<Booking>> GetAllAsync();
    Task<Booking?> GetByIdAsync(Guid id);
    Task<IList<Booking>> GetByUserIdAsync(Guid userId);
    Task AddAsync(Booking booking);
    void Update(Booking booking);
    void Remove(Booking booking);
    Task<bool> HasConflictAsync(DateOnly date, TimeOnly time, string location, Guid? excludeBookingId = null);
    Task SaveChangesAsync();
}
