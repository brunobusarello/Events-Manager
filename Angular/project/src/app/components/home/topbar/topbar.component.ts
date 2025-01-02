import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, ButtonModule, Menu],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.css'
})
export class TopbarComponent {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Opções',
                items: [
                    {
                        label: 'Editar dados',
                        icon: 'pi pi-user-edit'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.logout()
                        }
                    }
                ]
            }
        ];
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['login'])
    }
}
