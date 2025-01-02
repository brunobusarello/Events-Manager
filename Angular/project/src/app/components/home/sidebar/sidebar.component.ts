import { Component } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-sidebar',
  imports: [MenuModule, BadgeModule, OverlayBadgeModule, AvatarGroupModule, AvatarModule, NgIf, ScrollPanelModule, ScrollerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Navegação',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-chart-bar',
                        command: () => {
                            this.router.navigate(['/dashboard']);
                        }
                    },
                    {
                        label: 'Usuários',
                        icon: 'pi pi-user',
                        command: () => {
                            this.router.navigate(['/home/users']);
                        }
                    },
                    {
                        label: 'External',
                        icon: 'pi pi-home',
                        url: 'https://angular.io//'
                    }
                ]
            },
            {
              label: 'UI Components',
              items: [
                  { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                  { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                  { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                  { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                  { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                  { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                  { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                  { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                  { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                  { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                  { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                  { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                  { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                  { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                  { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                  { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
              ]
          },
          {
              label: 'Pages',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                  {
                      label: 'Landing',
                      icon: 'pi pi-fw pi-globe',
                      routerLink: ['/landing']
                  },
                  {
                      label: 'Auth',
                      icon: 'pi pi-fw pi-user',
                      items: [
                          {
                              label: 'Login',
                              icon: 'pi pi-fw pi-sign-in',
                              routerLink: ['/auth/login']
                          },
                          {
                              label: 'Error',
                              icon: 'pi pi-fw pi-times-circle',
                              routerLink: ['/auth/error']
                          },
                          {
                              label: 'Access Denied',
                              icon: 'pi pi-fw pi-lock',
                              routerLink: ['/auth/access']
                          }
                      ]
                  },
                  {
                      label: 'Crud',
                      icon: 'pi pi-fw pi-pencil',
                      routerLink: ['/pages/crud']
                  },
                  {
                      label: 'Timeline',
                      icon: 'pi pi-fw pi-calendar',
                      routerLink: ['/pages/timeline']
                  },
                  {
                      label: 'Not Found',
                      icon: 'pi pi-fw pi-exclamation-circle',
                      routerLink: ['/notfound']
                  },
                  {
                      label: 'Empty',
                      icon: 'pi pi-fw pi-circle-off',
                      routerLink: ['/pages/empty']
                  },
              ]
          },
          {
              label: 'Hierarchy',
              items: [
                  {
                      label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                      items: [
                          {
                              label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                          {
                              label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                              ]
                          },
                      ]
                  },
                  {
                      label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                      items: [
                          {
                              label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                  { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                          {
                              label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                              items: [
                                  { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                              ]
                          },
                      ]
                  }
              ]
          },
          {
              label: 'Get Started',
              items: [
                  {
                      label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                  }
              ]
          }
        ];
    }
}
