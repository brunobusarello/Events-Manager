import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { finalize, shareReplay } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ManageusersComponent } from '../manageusers.component';

@Component({
  selector: 'app-deleteuser',
  imports: [ConfirmDialogModule],
  templateUrl: './deleteuser.component.html',
  styleUrl: './deleteuser.component.css',
  providers: [ConfirmationService]
})
export class DeleteuserComponent {
  @Input() id!: number; 

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private authService: AuthService, private manageUsers: ManageusersComponent) { }

  ngOnInit() {
    this.show()
  }

  show() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.deleteUser()
      },
    });
  }

  deleteUser() {
    this.authService.deleteUser(this.id).pipe(
      finalize(() => {
        this.manageUsers.loadUsers()
      })
    ).subscribe({
      next: response => {
        this.messageService.add({ severity: 'info', summary: 'Sucesso!', detail: 'Usuário Deletado' });
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar' });
        console.error(error)
      }
    })
  }
}
