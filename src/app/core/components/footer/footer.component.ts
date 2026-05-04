import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObfuscatedEmailComponent } from '../../../shared/components/obfuscated-email/obfuscated-email.component';
import { NavigationService, NavItem, SocialLink } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ObfuscatedEmailComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private navService = inject(NavigationService);

  readonly year: number = new Date().getFullYear();

  // Shared from NavigationService — single source of truth
  protected readonly navItems: NavItem[] = this.navService.navItems;
  protected readonly socialLinks: SocialLink[] = this.navService.socialLinks;
}
