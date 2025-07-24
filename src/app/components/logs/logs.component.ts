import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs/logs.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-logs',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent implements OnInit {
  logs$!: Observable<any[]>;

  constructor(private readonly logsService: LogsService) {}

  ngOnInit(): void {
    this.logs$ = this.logsService.getLogsByTenant(
      localStorage.getItem('tenantId') || ''
    );
  }
}
