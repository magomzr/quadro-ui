import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}
  email: string = '';
  password: string = '';
  loginMessage: string = '';

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.loginMessage = 'Login successful!';
        console.log('Login successful:', response);
      },
      error: (error: any) => {
        this.loginMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed:', error);
      },
    });
  }
}
