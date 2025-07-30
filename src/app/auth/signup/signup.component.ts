import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  success = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    // Clear previous messages
    this.success = '';
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

    if (this.password.length < 4) {
      this.error = 'Password must be at least 4 characters long.';
      return;
    }

    const newUser: IUser = { 
      email: this.email.trim(), 
      password: this.password 
    };

    this.authService.signup(newUser).subscribe({
      next: () => {
        this.success = 'Signup successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.error = 'Signup failed. Please try again.';
      }
    });
  }
}