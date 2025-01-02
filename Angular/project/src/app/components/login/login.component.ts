import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { FocusTrap } from 'primeng/focustrap';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, FocusTrap],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading = false;

  fb = inject(FormBuilder)
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  verifyUser() {
    const { email, password } = this.loginForm.value;
    this.authService.verifyUser(email as String, password as String).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: response => {
        const user = response.body as User
        sessionStorage.setItem('email', user.email as string)
        sessionStorage.setItem('privilegies', response.body.privilegies)
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Usuário logado!'
          })
          this.router.navigate(['home'])
        console.log(response)
      },
      error: error => {
        if (error.status === 200) {
        } else if (error.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Usuário/Senha incorreta'
          })
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
    // this.authService.getUserByEmail(email as string).pipe(
    //   finalize(() => {
    //     this.loading = false; // Garante que o `loading` será atualizado ao final
    //   })
    // ).subscribe({
    //   next: response => {
    //     if (response.password === password) {
    //       sessionStorage.setItem('email', email as string)
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Sucesso!',
    //         detail: 'Usuário logado!'
    //       })
    //       this.router.navigate(['home'])
    //     } else {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Erro',
    //         detail: 'Usuário/Senha incorreta'
    //       })
    //     }
    //   },
    //   error: error => {
    //     if (error.status === 404) {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Erro',
    //         detail: 'Usuário/Senha incorreta'
    //       })
    //     } else {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Erro',
    //         detail: 'Algo deu errado'
    //       })
    //       console.error(error)
    //     }
    //   }
    // })
  }

  load() {
    this.loading = true;
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }
}
