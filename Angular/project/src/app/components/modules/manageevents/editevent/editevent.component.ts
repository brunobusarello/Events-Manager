import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { FocusTrap } from 'primeng/focustrap';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';
import { Events } from '../../../../interfaces/events';
import { AuthService } from '../../../../services/auth.service';
import { ManageeventsComponent } from '../manageevents.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editevent',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, FocusTrap, ToastModule, DialogModule, FormsModule, SelectButtonModule, DatePicker],
  templateUrl: './editevent.component.html',
  styleUrl: './editevent.component.css'
})
export class EditeventComponent {
  @Input() id!: number;
  visible = true;

  formatedDate!: string;
  originalDate!: string;

  loading = false;
  disableBtn = true;

  fb = inject(FormBuilder)
  eventForm = this.fb.group({
    dataEvento: ['', [Validators.required]],
    nome: ['', [Validators.required]],
    local: ['', [Validators.required]],
  },
  )

  constructor(private httpMethods: AuthService, private messageService: MessageService, private router: Router, private manageEvents: ManageeventsComponent, private datePipe: DatePipe) { }

  ngOnInit() {
    this.loadUserData()
  }

  loadUserData() {
    this.httpMethods.getEvent(this.id).subscribe({
      next: response => {
        console.log(response)
        this.originalDate = response.dataEvento
        response.dataEvento = this.datePipe.transform(response.dataEvento, 'dd/MM/yyyy')
        this.formatedDate = response.dataEvento
        this.eventForm.setValue({
          dataEvento: response.dataEvento,
          local: response.local,
          nome: response.nome,
        });

      },
      error: error => {
        if (error.status === 404) {
          this.router.navigate(['/home/users']);
        }
      }
    });
  }

  submitDetails() {
    let postData = { ...this.eventForm.value };

    if (postData.dataEvento === this.formatedDate) {
      postData.dataEvento = this.formatDate(this.originalDate)
    }


    this.httpMethods.updateEvent(this.id, postData as Events).pipe(
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
          detail: 'Evento atualizado com sucesso!',
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

  formatDate(dataInput: String): string {
    // Converte string dd/MM/yyyy para Date
    const partes = dataInput.split('-');
    const ano = +partes[0];
    const mes = +partes[1] - 1; // Mês em JavaScript começa do 0
    const dia = +partes[2];

    // Cria uma data sem fuso horário ajustado
    const dataUtc = new Date(Date.UTC(ano, mes, dia + 2));

    // Retorna no formato ISO yyyy-MM-dd
    return this.datePipe.transform(dataUtc, 'yyyy-MM-dd')!;
  }
}
