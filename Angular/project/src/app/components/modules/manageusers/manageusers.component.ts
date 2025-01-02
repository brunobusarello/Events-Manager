import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from '../../../interfaces/auth';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-manageusers',
  imports: [ToggleSwitchModule, FormsModule, TableModule, ButtonModule, PaginatorModule, DialogModule, InputTextModule],
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css',
})
export class ManageusersComponent {
  // Variáveis para adicionar componente
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  editModal!: ComponentRef<any> | null;
  addModal!: ComponentRef<any> | null;
  deleteModal!: ComponentRef<any> | null;

  users!: User[];
  selectedUser!: User;
  editButton = true;

  // Habilita a seleção de apenas uma linha da tabela
  metaKey: boolean = false;

  // Variáveis de paginação
  first = 0;
  rows = 10;
  offset = 0;
  total = 0;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.loadUsers()
  }

  onPageChange(event: PageEvent) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.offset = this.first / this.rows;
    this.loadUsers()
  }

  loadUsers() {
    this.authService.getUsers(this.offset, this.rows).subscribe({
      next: response => {
        this.users = response.users;
        this.total = response.totalUsers;
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
    if (this.selectedUser == null) {
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

    this.editModal = this.container.createComponent(EdituserComponent)
    this.editModal.instance.id = this.selectedUser.id
  }

  showAddModal() {
    if (this.addModal) {
      this.addModal.destroy()
      this.addModal = null;
    }

    this.addModal = this.container.createComponent(AdduserComponent)
  }

  showDeleteModal() {
    if (this.deleteModal) {
      this.deleteModal.destroy()
      this.deleteModal = null;
    }

    this.deleteModal = this.container.createComponent(DeleteuserComponent)
    this.deleteModal.instance.id = this.selectedUser.id
  }
}
