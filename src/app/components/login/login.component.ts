import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly mainPage = environment.mainPage;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  email: string = '';
  password: string = '';
  loginMessage: string = '';

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate([this.mainPage]);
      },
      error: (error: any) => {
        this.loginMessage = `Login failed. ${error.message}`;
      },
    });
  }
}
