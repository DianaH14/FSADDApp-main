namespace BookingApi.Interfaces;

public interface IJwtService
{
    string GenerateToken(Guid userId, string email, string role, string userName);
    DateTime GetExpiration();
}
