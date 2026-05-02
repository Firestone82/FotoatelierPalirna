import { Component, signal, OnInit, AfterViewInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import type { Package, FaqItem } from '../../core/services/content.service';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit, AfterViewInit {
  private contentService = inject(ContentService);

  packages = signal<Package[]>([]);
  faq = signal<FaqItem[]>([]);

  ngOnInit() {
    this.contentService.getPricing().subscribe(data => {
      this.packages.set(data.packages);
      this.faq.set(data.faq);
    });
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
