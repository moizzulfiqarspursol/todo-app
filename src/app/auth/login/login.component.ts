import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Clear any previous error
    this.error = '';

    // Validate input fields
    if (!this.email?.trim()) {
      this.error = 'Email is required.';
      return;
    }

    if (!this.password?.trim()) {
      this.error = 'Password is required.';
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    // Proceed with login
    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.error = 'Invalid email or password.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = 'An error occurred during login. Please try again.';
      }
    });
  }
}