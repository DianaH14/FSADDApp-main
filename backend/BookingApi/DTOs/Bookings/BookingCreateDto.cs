using System.ComponentModel.DataAnnotations;

namespace BookingApi.DTOs.Bookings;

public class BookingCreateDto
{
    [Required]
    [StringLength(150)]
    public string FullName { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public DateOnly Date { get; set; }

    [Required]
    public TimeOnly Time { get; set; }

    [Required]
    [StringLength(200)]
    public string Location { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string SessionType { get; set; } = null!;

    [StringLength(1000)]
    public string? Notes { get; set; }
}
