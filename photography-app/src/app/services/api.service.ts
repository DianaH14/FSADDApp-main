import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponseDto {
  token: string;
  email: string;
  name: string;
  role: string;
  expiresAt: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface BookingCreateDto {
  fullName: string;
  email: string;
  date: string;
  time: string;
  location: string;
  sessionType: string;
  notes?: string;
}

export interface ReviewCreateDto {
  rating: number;
  comment: string;
}

export interface ReviewResponseDto {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5230/api';

  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: HttpHeaders } | {} {
    const token = localStorage.getItem('fsadd_token');
    return token
      ? {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`
          })
        }
      : {};
  }

  login(body: { email: string; password: string }): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/auth/login`, body);
  }

  register(body: { name: string; email: string; password: string }): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/auth/register`, body);
  }

  getMe(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/auth/me`, this.authHeaders());
  }

  createBooking(body: BookingCreateDto): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/bookings`, body, this.authHeaders());
  }

  getReviews(): Observable<ReviewResponseDto[]> {
    return this.http.get<ReviewResponseDto[]>(`${this.baseUrl}/reviews`);
  }

  postReview(body: ReviewCreateDto): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/reviews`, body, this.authHeaders());
  }

  logout(): void {
    localStorage.removeItem('fsadd_token');
  }

  getToken(): string | null {
    return localStorage.getItem('fsadd_token');
  }
}
