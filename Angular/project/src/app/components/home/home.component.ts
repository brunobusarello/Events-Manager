import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { LayoutConfigService } from '../../services/layout-config.service';
import { NgClass } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, SplitterModule, NgClass, TopbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loggedUser = sessionStorage.getItem('email')

  constructor(private router: Router, private layoutConfig: LayoutConfigService) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  get containerClass(){
    return this.layoutConfig.containerClass;
  }
}
