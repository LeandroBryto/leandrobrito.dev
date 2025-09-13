import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }
  }

  public toggleTheme(): void {
    this.setDarkMode(!this.isDarkModeSubject.value);
  }

  public setDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    
    // Salvar preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Aplicar classe no body
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  public get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }
}