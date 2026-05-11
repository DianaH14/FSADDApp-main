using BookingApi.DTOs.Reviews;

namespace BookingApi.Interfaces;

public interface IReviewService
{
    Task<IList<ReviewResponseDto>> GetAllAsync();
    Task<ReviewResponseDto> GetByIdAsync(Guid id);
    Task<ReviewResponseDto> CreateAsync(Guid userId, string username, ReviewCreateDto request);
    Task<ReviewResponseDto> UpdateAsync(Guid id, Guid requesterId, string requesterRole, ReviewUpdateDto request);
    Task DeleteAsync(Guid id, Guid requesterId, string requesterRole);
}
