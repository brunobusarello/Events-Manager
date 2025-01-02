import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutConfigService {
  containerClass = 'layout-static'
  constructor() { }
}
