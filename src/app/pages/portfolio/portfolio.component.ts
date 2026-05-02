import { Component, signal, computed, AfterViewInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

interface Photo {
  src: string;
  alt: string;
  category: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink, LazyImageComponent, SectionHeaderComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements AfterViewInit {
  activeCategory = signal('Vše');
  isFilterSticky = signal(false);

  categories = ['Vše', 'Portrét', 'Svatba', 'Produkt', 'Reportáž'];

  photos: Photo[] = [
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Portrét v lese', category: 'Portrét' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Zásnuby', category: 'Svatba' },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Reportáž krajina', category: 'Reportáž' },
    { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', alt: 'Produkt hodiny', category: 'Produkt' },
    { src: 'https://images.unsplash.com/photo-1616169201999-849843cf88fc?w=800&q=80', alt: 'Portrét detail', category: 'Portrét' },
    { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', alt: 'Svatební den', category: 'Svatba' },
    { src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80', alt: 'Město reportáž', category: 'Reportáž' },
    { src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80', alt: 'Produktová fotografie', category: 'Produkt' },
    { src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80', alt: 'Módní portrét', category: 'Portrét' },
    { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'Novomanželé', category: 'Svatba' },
    { src: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80', alt: 'Zimní krajina', category: 'Reportáž' },
    { src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', alt: 'Káva produkt', category: 'Produkt' },
  ];

  filteredPhotos = computed(() => {
    const cat = this.activeCategory();
    return cat === 'Vše' ? this.photos : this.photos.filter(p => p.category === cat);
  });

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