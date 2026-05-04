import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);

  isScrolled = signal(false);
  isMenuOpen = signal(false);

  navItems = [
    { label: 'Úvod', route: '/' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'Ateliér', route: '/atelier' },
    { label: 'O mně', route: '/o-mne' },
    { label: 'Ceník', route: '/cenik' },
    { label: 'Kontakt', route: '/kontakt' },
  ];

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuOpen.set(false);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}
