import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly configService: ConfigService) {
    if (!localStorage.getItem('tenantId')) {
      localStorage.setItem('tenantId', 'be775553-17a1-4bcd-b674-d8d9a4c905c7');
    }
  }

  ngOnInit() {
    this.configService.loadConfig().subscribe();
  }

  get navbarItems() {
    return this.configService.getNavbarItems();
  }
}
