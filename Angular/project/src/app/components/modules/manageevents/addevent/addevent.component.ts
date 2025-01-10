import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { Component, inject, ViewChild } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FilesService } from '../../../../services/files.service';

interface UploadEvent {
  originalEvent: Event;
  files: File;
}

@Component({
  selector: 'app-addevent',
  imports: [Card, InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule, ButtonModule, RouterModule, FocusTrap, ToastModule, DialogModule, FormsModule, SelectButtonModule, DatePicker, CommonModule, FileUpload, ImageCropperComponent],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.css'
})
export class AddeventComponent {
  //@ViewChild('fileUploader') fileUploader!: FileUpload

  //dynamicUrl = 'http://localhost:8080/api/files/upload/5'

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  visible = true;

  //uploadedFiles: any[] = [];

  loading = false;
  disableBtn = true;

  //imageChangedEvent: any = '';

  fb = inject(FormBuilder)
  eventForm = this.fb.group({
    nome: ['', [Validators.required]],
    local: ['', [Validators.required]],
    dataEvento: ['', [Validators.required]]
  })

  constructor(private httpMethods: AuthService, private messageService: MessageService, private router: Router, private manageEvents: ManageeventsComponent, private fileService: FilesService, private sanitizer: DomSanitizer) { }

  submitDetails() {
    let postData = { ...this.eventForm.value };

    this.httpMethods.registerEvents(postData as Events).pipe(
      finalize(() => {
        this.loading = false; // Garante que o `loading` será atualizado ao final
        this.visible = false;
        this.router.navigate(['/home/events']);
        this.manageEvents.loadEvents()
      })
    ).subscribe({
      next: response => {
        const values = response as Events
        this.submitImage(values.id)
        /*
        this.dynamicUrl = `http://localhost:8080/api/files/upload/${values.id}`
        this.fileUploader.url = this.dynamicUrl
        console.log("Url atualizada: " + this.dynamicUrl)
        this.uploadFile()
        */
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

  fileChangeEvent(event: Event): void {
      this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
      // event.blob can be used to upload the cropped image
    }
    imageLoaded(image: LoadedImage) {
      // show cropper
    }
    cropperReady() {
      // cropper ready
    }
    loadImageFailed() {
      // show message
    }
  
    submitImage(id: number) {
      this.fileService.uploadImage(this.croppedImage, id).subscribe({
        next: response => {
        },
        error: error => {
          if (error.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'sucesso!!',
              detail: 'upload concluído!'
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro na busca dos dados'
            })
            console.error(error)
          }
        }
      })
    }

  /*
  onFileChange(event: any): void {
    this.imageChangedEvent = event;
  }

  uploadFile() {
    if (this.fileUploader.files.length > 0) {
      console.log("Ultimo")
      this.fileUploader.upload();
    } else {
      console.error('Nenhum arquivo selecionado para upload.');
    }
  }

  onUpload(event: UploadEvent) {
    this.uploadedFiles.push(event.files);

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
*/
  load() {
    this.loading = true;
  }
}
