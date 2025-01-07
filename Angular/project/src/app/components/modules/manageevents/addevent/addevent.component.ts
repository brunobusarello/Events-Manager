import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { FocusTrap } from 'primeng/focustrap';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Events } from '../../../../interfaces/events';
import { ManageeventsComponent } from '../manageevents.component';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-addevent',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, FocusTrap, ToastModule, DialogModule, FormsModule, SelectButtonModule, DatePicker],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.css'
})
export class AddeventComponent {

  visible = true;

  loading = false;
  disableBtn = true;

  fb = inject(FormBuilder)
  eventForm = this.fb.group({
    nome: ['', [Validators.required]],
    local: ['', [Validators.required]],
    dataEvento: ['', [Validators.required]]
  },
  )

  constructor(private httpMethods: AuthService, private messageService: MessageService, private router: Router, private manageEvents: ManageeventsComponent) { }


  submitDetails() {
    let postData = { ...this.eventForm.value };

    console.log(postData)

    this.httpMethods.registerEvents(postData as Events).pipe(
      finalize(() => {
        this.loading = false; // Garante que o `loading` será atualizado ao final
        this.visible = false;
        this.router.navigate(['/home/events']);
        this.manageEvents.loadEvents()
      })
    ).subscribe({
      next: response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Evento criado com sucesso!',
        });
      },
      error: error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Houve algum erro',
        });
      },
    });
  }

  load() {
    this.loading = true;
  }
}
