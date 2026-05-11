using BookingApi.DTOs.Bookings;

namespace BookingApi.Interfaces;

public interface IBookingService
{
    Task<IList<BookingResponseDto>> GetAllAsync(Guid requesterId, string requesterRole);
    Task<BookingResponseDto> GetByIdAsync(Guid bookingId, Guid requesterId, string requesterRole);
    Task<BookingResponseDto> CreateAsync(Guid userId, BookingCreateDto request);
    Task<BookingResponseDto> UpdateAsync(Guid bookingId, Guid requesterId, string requesterRole, BookingUpdateDto request);
    Task DeleteAsync(Guid bookingId, Guid requesterId, string requesterRole);
}
