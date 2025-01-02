import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { FocusTrap } from 'primeng/focustrap';
import { InputMask } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { Observable, of, finalize } from 'rxjs';
import { User } from '../../../../interfaces/auth';
import { AuthService } from '../../../../services/auth.service';
import { passwordMatchValidator } from '../../../../shared/passord-match.directive';
import { ManageusersComponent } from '../manageusers.component';

@Component({
  selector: 'app-edituser',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, InputMask, FocusTrap, ToastModule, DialogModule, FormsModule, SelectButtonModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  @Input() id!: number;

  cpf: string = '';

  visible = true;

  originEmail: string = '';

  loading = false;
  disableBtn = true;

  privilegies: any[] = [
    { label: 'Admin', value: 2 },
    { label: 'Visualizador', value: 1 },
  ]

  fb = inject(FormBuilder)
  loginForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', Validators.required, Validators.email],
    password: [''],
    confirmPassword: [''],
    cpf: ['', Validators.required],
    privilegies: [0, Validators.required]
  },
  )

  constructor(private httpMethods: AuthService, private messageService: MessageService, private router: Router, private cdr: ChangeDetectorRef, private manageUsers: ManageusersComponent) { }

  ngOnInit() {
    this.loadUserData()
  }

  loadUserData() {
    this.httpMethods.getUser(this.id).subscribe({
      next: response => {
        this.originEmail = response.email
        this.loginForm.setValue({
          privilegies: response.privilegies,
          cpf: response.cpf,
          fullName: response.fullName,
          email: response.email,
          password: '',
          confirmPassword: '',
        });

      },
      error: error => {
        if (error.status === 404) {
          this.router.navigate(['/home/users']);
        }
      }
    });
  }

  asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(null); // Exemplo simples de validador assíncrono válido
  }

  submitDetails() {
    if (this.loginForm.controls['email'].value === this.originEmail) {
      this.saveNewUser()
    } else {
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
  }

  saveNewUser() {
    let postData = { ...this.loginForm.value };
    postData.email = this.loginForm.controls['email'].value
    delete postData.confirmPassword;

    this.httpMethods.updateUser(postData as User, this.id).pipe(
      finalize(() => {
        this.loading = false; // Garante que o `loading` será atualizado ao final
        this.visible = false;
        this.router.navigate(['/home/users']);
        this.manageUsers.loadUsers()
      })
    ).subscribe({
      next: response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Usuário atualizado com sucesso!',
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
