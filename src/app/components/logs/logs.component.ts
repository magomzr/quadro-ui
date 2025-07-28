import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs/logs.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LabelPipe } from '../../pipes/label.pipe';

@Component({
  selector: 'app-logs',
  imports: [AsyncPipe, DatePipe, LabelPipe],
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
