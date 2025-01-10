import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  baseUrl = 'http://localhost:8080/api/files'

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  uploadImage(safeUrl: SafeUrl, id: number): Observable<any> {
    const blobUrl = this.sanitizer.sanitize(4, safeUrl); // 4 = SecurityContext.RESOURCE_URL
    if (!blobUrl) {
      throw new Error('Falha ao sanitizar a URL.');
    }

    // Retorna um Observable que encapsula a lógica de conversão e envio
    return from(this.blobFromUrl(blobUrl)).pipe(
      switchMap((blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'image.png'); // Nome do arquivo é opcional
        return this.httpClient.post(`${this.baseUrl}/upload/${id}`, formData);
      })
    );
  }

  private blobFromUrl(blobUrl: string): Promise<Blob> {
    return fetch(blobUrl).then((response) => response.blob());
  }
}
