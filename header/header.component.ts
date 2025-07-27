import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../src/app/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  isLoginPage = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    // Watch for route changes to detect if we're on the login page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.url === '/login';
        this.isLoggedIn = this.authService.isLoggedIn(); // update on route change too
      });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
