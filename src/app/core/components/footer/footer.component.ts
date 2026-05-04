import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObfuscatedEmailComponent } from '../../../shared/components/obfuscated-email/obfuscated-email.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ObfuscatedEmailComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year: number = new Date().getFullYear();
}
