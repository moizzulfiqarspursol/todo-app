import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, of } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:3000/users';
  private readonly STORAGE_KEY = 'auth_user';

  constructor(private http: HttpClient) {}

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.API_URL, user);
  }

  login(email: string, password: string): Observable<IUser | null> {
    // Don't make API call if email or password is empty
    if (!email?.trim() || !password?.trim()) {
      return of(null);
    }

    return this.http
      .get<IUser[]>(`${this.API_URL}?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password)}`)
      .pipe(
        map(users => {
          if (users && users.length === 1) {
            const user = users[0];
            if (user.email === email.trim() && user.password === password) {
              localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
              return user;
            }
          }
          return null;
        }),
        catchError(error => {
          console.error('Login API error:', error);
          return of(null);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getLoggedInUser(): IUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}