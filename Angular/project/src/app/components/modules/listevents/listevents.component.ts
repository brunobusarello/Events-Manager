import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { Events } from '../../../interfaces/events';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-listevents',
  imports: [
    CardModule, ButtonModule, PaginatorModule
  ],
  templateUrl: './listevents.component.html',
  styleUrl: './listevents.component.css',
  providers: [DatePipe]
})
export class ListeventsComponent {

  events = signal<any>([]);

  first = 0;
  rows = 10;
  offset = 0;
  total = 0;

  constructor(private authService: AuthService, private datePipe: DatePipe, private messageService: MessageService) { }

  ngOnInit() {
    this.loadEvents()
  }

  loadEvents() {
    this.authService.getEventsLimited(this.offset, this.rows).subscribe({
      next: response => {
        const newEvents = response.events
        this.total = response.totalEvents
        newEvents.forEach(event => {
          event.dataEvento = this.datePipe.transform(event.dataEvento, 'dd/MM/yyyy')
        });
        this.events.set(newEvents)
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro na busca dos dados'
        })
        console.error(error)
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.offset = this.first / this.rows;
    this.loadEvents()
  }
}
