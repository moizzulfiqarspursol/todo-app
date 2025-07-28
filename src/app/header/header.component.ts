import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoginPage = false;
  isSignupPage = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateState(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateState(event.urlAfterRedirects);
      });
  }

  private updateState(url: string): void {
    this.isLoginPage = url === '/login';
    this.isSignupPage = url === '/signup';
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
