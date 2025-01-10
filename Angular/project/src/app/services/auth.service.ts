import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { catchError, Observable, throwError } from 'rxjs';
import { Events } from '../interfaces/events';
import { NgOptimizedImage } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null

  private baseUrl = 'http://localhost:8080/api'

  constructor(private httpClient: HttpClient) { }

  // Requisições HTTP para os usuários
  registerUser(userDetails: User) {
    return this.httpClient.post(`${this.baseUrl}/users`, userDetails)
  }

  getUserByEmail(email: String): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/email/${email}`)
  }

  getUsers(offset: number, limit: number): Observable<{users: User[], totalUsers: number}> {
    return this.httpClient.get<{users: User[], totalUsers: number}>(`${this.baseUrl}/users/limited?offset=${offset}&limit=${limit}`)
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`)
  }

  verifyUser(email: String, password: String): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users/verify`, {email, password}, {observe: 'response'}).pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    )
  }

  updateUser(userDetails: User, id: number){
    return this.httpClient.put(`${this.baseUrl}/users/${id}`, userDetails)
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/users/${id}`)
  }

  // Requisições HTTP para os eventos
  getEventsLimited(offset: number, limit: number): Observable<{events: Events[], totalEvents: number}> {
    return this.httpClient.get<{events: Events[], totalEvents: number}>(`${this.baseUrl}/events/limited?offset=${offset}&limit=${limit}`)
  }

  getEvents(): Observable<Events[]> {
    return this.httpClient.get<Events[]>(`${this.baseUrl}/events`)
  }

  registerEvents(events: Events){
    return this.httpClient.post(`${this.baseUrl}/events`, events);
  }

  getEvent(id: number): Observable<Events> {
    return this.httpClient.get<Events>(`${this.baseUrl}/events/${id}`)
  }

  updateEvent(id: number, event: Events) {
    return this.httpClient.put(`${this.baseUrl}/events/${id}`, event)
  }

  deleteEvent(id: number){
    return this.httpClient.delete(`${this.baseUrl}/events/${id}`)
  }

  getImage(id: number): any {
    return this.httpClient.get(`${this.baseUrl}/files/download/${id}`)
  }

  saveImage(id: number, file: File): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/files/upload/${id}`, file)
  }
}
