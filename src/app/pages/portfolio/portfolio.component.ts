import { Component, signal, computed, OnInit, AfterViewInit, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ContentService } from '../../core/services/content.service';
import type { Photo } from '../../core/services/content.service';

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink, LazyImageComponent, SectionHeaderComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  private contentService = inject(ContentService);

  activeCategory = signal('Vše');
  isFilterSticky = signal(false);
  categories = signal<string[]>(['Vše']);
  photos = signal<Photo[]>([]);

  filteredPhotos = computed(() => {
    const cat = this.activeCategory();
    const all = this.photos();
    return cat === 'Vše' ? all : all.filter(p => p.category === cat);
  });

  ngOnInit() {
    this.contentService.getPortfolio().subscribe(data => {
      this.photos.set(data.photos);
      this.categories.set(data.categories);
    });
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  @HostListener('window:scroll')
  onScroll() {
    const filterBar = document.querySelector('.portfolio-filter');
    if (filterBar) {
      const rect = filterBar.getBoundingClientRect();
      this.isFilterSticky.set(rect.top <= 72);
    }
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
