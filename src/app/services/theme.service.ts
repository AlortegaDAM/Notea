import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean = true;
  constructor() {

   }
  tema(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  this.darkMode = prefersDark.matches;}
  cambio() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
    
  }
}
