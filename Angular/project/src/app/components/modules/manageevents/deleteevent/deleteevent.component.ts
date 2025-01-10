import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { ManageeventsComponent } from '../manageevents.component';

@Component({
  selector: 'app-deleteevent',
  imports: [ConfirmDialogModule],
  templateUrl: './deleteevent.component.html',
  styleUrl: './deleteevent.component.css',
  providers: [ConfirmationService]
})
export class DeleteeventComponent {
  @Input() id!: number; 
  
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private authService: AuthService, private manageEvents: ManageeventsComponent) { }
  
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
      this.authService.deleteEvent(this.id).pipe(
        finalize(() => {
          this.manageEvents.loadEvents()
        })
      ).subscribe({
        next: response => {
          this.messageService.add({ severity: 'info', summary: 'Sucesso!', detail: 'Evento Deletado' });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar' });
          console.error(error)
        }
      })
    }
}
