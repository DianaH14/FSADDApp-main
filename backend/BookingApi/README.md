# BookingApi Backend

This ASP.NET Core Web API implements the backend for the FSADD photography portfolio application.

## Features
- JWT authentication and role-based authorization
- User registration, login, and profile retrieval
- Booking management with conflict prevention and per-user access control
- Review management with owner-only edits and admin moderation
- SQL Server database via Entity Framework Core
- Swagger / OpenAPI documentation
- CORS support for frontend connectivity
- Global exception handling and clean JSON responses

## Folder Structure
- `Controllers/` - API endpoints
- `Data/` - EF Core `ApplicationDbContext`
- `Entities/` - database entities and enums
- `DTOs/` - request and response models
- `Interfaces/` - service and repository contracts
- `Repositories/` - data access implementations
- `Services/` - business logic and JWT handling
- `Middleware/` - global error handling
- `Helpers/` - hashing and JWT settings

## Local Development

### Prerequisites
- .NET 8 SDK
- SQL Server or LocalDB
- Optional: Docker

### Update configuration

Edit `appsettings.json`:
- `ConnectionStrings:DefaultConnection`
- `JwtSettings:Secret`
- `AllowedOrigins`

### Run locally

```powershell
cd backend\BookingApi
dotnet restore
dotnet build
dotnet ef database update
dotnet run
```

The API will listen on the configured port and expose Swagger at `/swagger`.

## Database Migration

Create or update the database schema:

```powershell
cd backend\BookingApi
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Docker

Build and run the backend container:

```powershell
docker build -t fsadd-bookingapi .
docker run -e ConnectionStrings__DefaultConnection="Server=host.docker.internal,1433;Database=FSADD_BookingApi;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True" -e JwtSettings__Secret="ReplaceThisSecretWithAStrongRandomValue123!" -p 5000:5000 fsadd-bookingapi
```

## API endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Bookings
- `GET /api/bookings`
- `GET /api/bookings/{id}`
- `POST /api/bookings`
- `PUT /api/bookings/{id}`
- `DELETE /api/bookings/{id}`

### Reviews
- `GET /api/reviews`
- `GET /api/reviews/{id}`
- `POST /api/reviews`
- `PUT /api/reviews/{id}`
- `DELETE /api/reviews/{id}`

## Example frontend requests

### Login
```js
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'password123' })
});
const data = await loginResponse.json();
const token = data.token;
```

### Create booking
```js
await fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    date: '2026-08-01',
    time: '14:00:00',
    location: 'Downtown studio',
    sessionType: 'Portrait',
    notes: 'Please arrive 10 minutes early.'
  })
});
```

### Post review
```js
await fetch('http://localhost:5000/api/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    rating: 5,
    comment: 'Amazing photography and great service!'
  })
});
```

### Axios example
```js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const loginResponse = await api.post('auth/login', { email: 'user@example.com', password: 'password123' });
const token = loginResponse.data.token;

const bookingResponse = await api.post('bookings', {
  fullName: 'Alex Johnson',
  email: 'alex@example.com',
  date: '2026-08-01',
  time: '14:00:00',
  location: 'Downtown studio',
  sessionType: 'Portrait',
  notes: 'Please arrive 10 minutes early.'
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```
