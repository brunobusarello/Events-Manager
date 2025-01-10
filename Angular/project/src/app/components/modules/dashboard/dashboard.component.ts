import { Component } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FilesService } from '../../../services/files.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [ImageCropperComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer, private fileServive: FilesService, private messageService: MessageService) { }

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

  submitImage() {
    this.fileServive.uploadImage(this.croppedImage, 100).subscribe({
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
}
