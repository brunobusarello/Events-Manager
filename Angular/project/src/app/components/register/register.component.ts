import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputMask } from 'primeng/inputmask';
import { FocusTrap } from 'primeng/focustrap';
import { passwordMatchValidator } from '../../shared/passord-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, InputMask, FocusTrap, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  disableBtn = true;

  fb = inject(FormBuilder)
  loginForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    cpf: ['', Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]
  }, {
    validators: passwordMatchValidator
  })

  constructor(private httpMethods: AuthService, private messageService: MessageService, private router: Router) { }

  submitDetails() {
    this.httpMethods.getUserByEmail(this.loginForm.controls['email'].value as string).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Email já cadastrado'
        })
      },
      error: error => {
        if (error.status === 404) {
          this.saveNewUser()
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Algo deu errado'
          })
          console.error(error)
        }
      }
    })
  }

  saveNewUser() {
    let postData = { ...this.loginForm.value };
    postData.email = this.loginForm.controls['email'].value
    delete postData.confirmPassword;

    this.httpMethods.registerUser(postData as User).pipe(
      finalize(() => {
        this.loading = false; // Garante que o `loading` será atualizado ao final
      })
    ).subscribe({
      next: response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Conta criada com sucesso!',
        });
        this.router.navigate(['login']);
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

  get email() {
    return this.loginForm.controls['email']
  }
  get password() {
    return this.loginForm.controls['password']
  }
  get confirmPassword() {
    return this.loginForm.controls['confirmPassword']
  }
}
