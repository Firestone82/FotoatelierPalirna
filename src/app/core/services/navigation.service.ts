import { Injectable } from '@angular/core';

export interface NavItem {
  readonly label: string;
  readonly route: string;
}

export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly navItems: NavItem[] = [
    { label: 'Úvod',      route: '/' },
    { label: 'Portfolio', route: '/portfolio' },
    { label: 'O mně',     route: '/o-mne' },
    { label: 'Ceník',     route: '/cenik' },
    { label: 'Kontakt',   route: '/kontakt' },
  ];

  readonly socialLinks: SocialLink[] = [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'Facebook',  url: 'https://facebook.com' },
    { label: 'Behance',   url: 'https://behance.net' },
  ];
}
