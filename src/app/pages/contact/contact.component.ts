import { Component, AfterViewInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  submitted = signal(false);
  sending = signal(false);

  formData = {
    name: '',
    email: '',
    phone: '',
    type: 'Portrét',
    date: '',
    message: '',
    gdpr: false,
  };

  shootTypes = ['Portrét', 'Svatba', 'Produkt', 'Reportáž', 'Jiné'];

  onSubmit(form: NgForm) {
    if (form.invalid || !this.formData.gdpr) return;
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
    }, 1200);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
  }
}