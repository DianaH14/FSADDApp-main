using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BookingApi.DTOs.Reviews;
using BookingApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookingApi.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews = await _reviewService.GetAllAsync();
        return Ok(reviews);
    }

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var review = await _reviewService.GetByIdAsync(id);
        return Ok(review);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ReviewCreateDto request)
    {
        var requester = GetRequester();
        var review = await _reviewService.CreateAsync(requester.UserId, requester.Username, request);
        return CreatedAtAction(nameof(GetById), new { id = review.Id }, review);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ReviewUpdateDto request)
    {
        var requester = GetRequester();
        var review = await _reviewService.UpdateAsync(id, requester.UserId, requester.Role, request);
        return Ok(review);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var requester = GetRequester();
        await _reviewService.DeleteAsync(id, requester.UserId, requester.Role);
        return NoContent();
    }

    private (Guid UserId, string Role, string Username) GetRequester()
    {
        var sub = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;
        var username = User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;

        if (string.IsNullOrWhiteSpace(sub) || !Guid.TryParse(sub, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid token claims.");
        }

        return (userId, role, username);
    }
}
