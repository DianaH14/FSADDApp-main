using BookingApi.DTOs.Bookings;
using BookingApi.Entities;
using BookingApi.Interfaces;

namespace BookingApi.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IUserRepository _userRepository;

    public BookingService(IBookingRepository bookingRepository, IUserRepository userRepository)
    {
        _bookingRepository = bookingRepository;
        _userRepository = userRepository;
    }

    public async Task<IList<BookingResponseDto>> GetAllAsync(Guid requesterId, string requesterRole)
    {
        var bookings = requesterRole == UserRoles.Admin
            ? await _bookingRepository.GetAllAsync()
            : await _bookingRepository.GetByUserIdAsync(requesterId);

        return bookings.Select(ToDto).ToList();
    }

    public async Task<BookingResponseDto> GetByIdAsync(Guid bookingId, Guid requesterId, string requesterRole)
    {
        var booking = await _bookingRepository.GetByIdAsync(bookingId);
        if (booking == null)
        {
            throw new KeyNotFoundException("Booking not found.");
        }

        if (requesterRole != UserRoles.Admin && booking.UserId != requesterId)
        {
            throw new UnauthorizedAccessException("Access denied.");
        }

        return ToDto(booking);
    }

    public async Task<BookingResponseDto> CreateAsync(Guid userId, BookingCreateDto request)
    {
        if (await _bookingRepository.HasConflictAsync(request.Date, request.Time, request.Location))
        {
            throw new InvalidOperationException("The requested time slot is already booked.");
        }

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new KeyNotFoundException("User not found.");
        }

        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim().ToLowerInvariant(),
            Date = request.Date,
            Time = request.Time,
            Location = request.Location.Trim(),
            SessionType = request.SessionType.Trim(),
            Notes = request.Notes?.Trim(),
            Status = BookingStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        await _bookingRepository.AddAsync(booking);
        await _bookingRepository.SaveChangesAsync();

        return ToDto(booking);
    }

    public async Task<BookingResponseDto> UpdateAsync(Guid bookingId, Guid requesterId, string requesterRole, BookingUpdateDto request)
    {
        var booking = await _bookingRepository.GetByIdAsync(bookingId);
        if (booking == null)
        {
            throw new KeyNotFoundException("Booking not found.");
        }

        if (requesterRole != UserRoles.Admin && booking.UserId != requesterId)
        {
            throw new UnauthorizedAccessException("Access denied.");
        }

        if (await _bookingRepository.HasConflictAsync(request.Date, request.Time, request.Location, bookingId))
        {
            throw new InvalidOperationException("The requested time slot is already booked.");
        }

        booking.FullName = request.FullName.Trim();
        booking.Email = request.Email.Trim().ToLowerInvariant();
        booking.Date = request.Date;
        booking.Time = request.Time;
        booking.Location = request.Location.Trim();
        booking.SessionType = request.SessionType.Trim();
        booking.Notes = request.Notes?.Trim();
        booking.Status = request.Status;

        _bookingRepository.Update(booking);
        await _bookingRepository.SaveChangesAsync();

        return ToDto(booking);
    }

    public async Task DeleteAsync(Guid bookingId, Guid requesterId, string requesterRole)
    {
        var booking = await _bookingRepository.GetByIdAsync(bookingId);
        if (booking == null)
        {
            throw new KeyNotFoundException("Booking not found.");
        }

        if (requesterRole != UserRoles.Admin && booking.UserId != requesterId)
        {
            throw new UnauthorizedAccessException("Access denied.");
        }

        _bookingRepository.Remove(booking);
        await _bookingRepository.SaveChangesAsync();
    }

    private static BookingResponseDto ToDto(Booking booking)
    {
        return new BookingResponseDto
        {
            Id = booking.Id,
            UserId = booking.UserId,
            FullName = booking.FullName,
            Email = booking.Email,
            Date = booking.Date,
            Time = booking.Time,
            Location = booking.Location,
            SessionType = booking.SessionType,
            Notes = booking.Notes,
            Status = booking.Status,
            CreatedAt = booking.CreatedAt
        };
    }
}
