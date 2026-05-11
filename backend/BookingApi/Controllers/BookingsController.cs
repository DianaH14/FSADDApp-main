using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BookingApi.DTOs.Bookings;
using BookingApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookingApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requester = GetRequester();
        var bookings = await _bookingService.GetAllAsync(requester.UserId, requester.Role);
        return Ok(bookings);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var requester = GetRequester();
        var booking = await _bookingService.GetByIdAsync(id, requester.UserId, requester.Role);
        return Ok(booking);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookingCreateDto request)
    {
        var requester = GetRequester();
        var booking = await _bookingService.CreateAsync(requester.UserId, request);
        return CreatedAtAction(nameof(GetById), new { id = booking.Id }, booking);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] BookingUpdateDto request)
    {
        var requester = GetRequester();
        var booking = await _bookingService.UpdateAsync(id, requester.UserId, requester.Role, request);
        return Ok(booking);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var requester = GetRequester();
        await _bookingService.DeleteAsync(id, requester.UserId, requester.Role);
        return NoContent();
    }

    private (Guid UserId, string Role) GetRequester()
    {
        var sub = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

        if (string.IsNullOrWhiteSpace(sub) || !Guid.TryParse(sub, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid token claims.");
        }

        return (userId, role);
    }
}
