using BookingApi.Entities;

namespace BookingApi.Interfaces;

public interface IReviewRepository
{
    Task<IList<Review>> GetAllAsync();
    Task<Review?> GetByIdAsync(Guid id);
    Task AddAsync(Review review);
    void Update(Review review);
    void Remove(Review review);
    Task SaveChangesAsync();
}
