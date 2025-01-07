import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Events } from '../../../interfaces/events';
import { EditeventComponent } from './editevent/editevent.component';
import { AddeventComponent } from './addevent/addevent.component';
import { DeleteeventComponent } from './deleteevent/deleteevent.component';
import { DatePipe } from '@angular/common';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-manageevents',
  imports: [ToggleSwitchModule, FormsModule, TableModule, ButtonModule, PaginatorModule, DialogModule, InputTextModule],
  templateUrl: './manageevents.component.html',
  styleUrl: './manageevents.component.css',
  providers: [DatePipe]
})
export class ManageeventsComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  editModal!: ComponentRef<any> | null;
  addModal!: ComponentRef<any> | null;
  deleteModal!: ComponentRef<any> | null;

  events!: Events[];
  selectedEvents!: Events;
  editButton = true;

  // Habilita a seleção de apenas uma linha da tabela
  metaKey: boolean = false;

  // Variáveis de paginação
  first = 0;
  rows = 10;
  offset = 0;
  total = 0;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loadEvents()
  }

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.offset = this.first / this.rows;
    this.loadEvents()
  }

  loadEvents() {
    this.authService.getEvents(this.offset, this.rows).subscribe({
      next: response => {
        const newEvents = response.events
        this.total = response.totalEvents
        newEvents.forEach(event => {
          event.dataEvento = this.datePipe.transform(event.dataEvento, 'dd/MM/yyyy')
        });
        this.events = newEvents
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

  showSelected() {
    if (this.selectedEvents == null) {
      this.editButton = true
    } else {
      this.editButton = false
    }
  }

  showEditModal() {
    if (this.editModal) {
      this.editModal.destroy()
      this.editModal = null;
    }

    this.editModal = this.container.createComponent(EditeventComponent)
    this.editModal.instance.id = this.selectedEvents.id
  }

  showAddModal() {
    if (this.addModal) {
      this.addModal.destroy()
      this.addModal = null;
    }

    this.addModal = this.container.createComponent(AddeventComponent)
  }

  showDeleteModal() {
    if (this.deleteModal) {
      this.deleteModal.destroy()
      this.deleteModal = null;
    }

    this.deleteModal = this.container.createComponent(DeleteeventComponent)
    this.deleteModal.instance.id = this.selectedEvents.id
  }
}
