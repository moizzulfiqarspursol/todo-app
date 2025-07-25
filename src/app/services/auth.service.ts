import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http
      .get<IUser[]>(`${this.API_URL}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return user;
          }
          return null;
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
