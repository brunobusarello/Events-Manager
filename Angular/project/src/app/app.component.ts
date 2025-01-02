import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const body = document.body;
        body.className = ''; // Limpa as classes do body
        if (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register') {
          body.classList.add('centered-route');
        }
      }
    });
  }
}
