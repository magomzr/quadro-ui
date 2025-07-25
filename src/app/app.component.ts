import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    if (!localStorage.getItem('tenantId')) {
      localStorage.setItem('tenantId', 'be775553-17a1-4bcd-b674-d8d9a4c905c7');
    }
  }
}
