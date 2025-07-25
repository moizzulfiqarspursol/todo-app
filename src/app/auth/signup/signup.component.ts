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
    const newUser: IUser = { email: this.email, password: this.password };

    this.authService.signup(newUser).subscribe({
      next: () => {
        this.success = 'Signup successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'Signup failed. Try again.';
      }
    });
  }
}
