import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);

  isScrolled = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  readonly navItems: NavItem[] = [
    { label: 'Úvod', route: '/' },
    { label: 'Portfolio', route: '/portfolio' },
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
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }
}
