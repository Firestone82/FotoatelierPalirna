import { Component, AfterViewInit, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ObfuscatedEmailComponent } from '../../shared/components/obfuscated-email/obfuscated-email.component';
import { NavigationService, SocialLink } from '../../core/services/navigation.service';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  message: string;
  gdpr: boolean;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink, ObfuscatedEmailComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  private navService = inject(NavigationService);

  submitted = signal<boolean>(false);
  sending = signal<boolean>(false);

  readonly shootTypes: string[] = ['Portrét', 'Svatba', 'Produkt', 'Reportáž', 'Jiné'];

  // Social links from NavigationService — no duplication with footer
  protected readonly socialLinks: SocialLink[] = this.navService.socialLinks;

  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    type: 'Portrét',
    date: '',
    message: '',
    gdpr: false,
  };

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.formData.gdpr) return;
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
    }, 1200);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
  }
}
