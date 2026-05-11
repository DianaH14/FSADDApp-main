using BookingApi.DTOs.Reviews;
using BookingApi.Entities;
using BookingApi.Interfaces;

namespace BookingApi.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;

    public ReviewService(IReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }

    public async Task<IList<ReviewResponseDto>> GetAllAsync()
    {
        var reviews = await _reviewRepository.GetAllAsync();
        return reviews.Select(ToDto).ToList();
    }

    public async Task<ReviewResponseDto> GetByIdAsync(Guid id)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if (review == null)
        {
            throw new KeyNotFoundException("Review not found.");
        }

        return ToDto(review);
    }

    public async Task<ReviewResponseDto> CreateAsync(Guid userId, string username, ReviewCreateDto request)
    {
        var review = new Review
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Username = username,
            Rating = request.Rating,
            Comment = request.Comment.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        await _reviewRepository.AddAsync(review);
        await _reviewRepository.SaveChangesAsync();

        return ToDto(review);
    }

    public async Task<ReviewResponseDto> UpdateAsync(Guid id, Guid requesterId, string requesterRole, ReviewUpdateDto request)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if (review == null)
        {
            throw new KeyNotFoundException("Review not found.");
        }

        if (requesterRole != UserRoles.Admin && review.UserId != requesterId)
        {
            throw new UnauthorizedAccessException("Access denied.");
        }

        review.Rating = request.Rating;
        review.Comment = request.Comment.Trim();

        _reviewRepository.Update(review);
        await _reviewRepository.SaveChangesAsync();

        return ToDto(review);
    }

    public async Task DeleteAsync(Guid id, Guid requesterId, string requesterRole)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if (review == null)
        {
            throw new KeyNotFoundException("Review not found.");
        }

        if (requesterRole != UserRoles.Admin && review.UserId != requesterId)
        {
            throw new UnauthorizedAccessException("Access denied.");
        }

        _reviewRepository.Remove(review);
        await _reviewRepository.SaveChangesAsync();
    }

    private static ReviewResponseDto ToDto(Review review)
    {
        return new ReviewResponseDto
        {
            Id = review.Id,
            UserId = review.UserId,
            Username = review.Username,
            Rating = review.Rating,
            Comment = review.Comment,
            CreatedAt = review.CreatedAt
        };
    }
}
