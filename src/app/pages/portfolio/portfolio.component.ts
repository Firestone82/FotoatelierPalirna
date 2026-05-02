import { Component, signal, computed, AfterViewInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

interface Photo {
  src: string;
  alt: string;
  category: string;
  aspectRatio: string;
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
    { src: 'https://picsum.photos/seed/pp01/400/600', alt: 'Portrét v lese', category: 'Portrét', aspectRatio: '2/3' },
    { src: 'https://picsum.photos/seed/pw01/600/400', alt: 'Zásnuby', category: 'Svatba', aspectRatio: '3/2' },
    { src: 'https://picsum.photos/seed/pr01/800/450', alt: 'Reportáž krajina', category: 'Reportáž', aspectRatio: '16/9' },
    { src: 'https://picsum.photos/seed/ppd01/600/600', alt: 'Produkt hodiny', category: 'Produkt', aspectRatio: '1/1' },
    { src: 'https://picsum.photos/seed/pp02/450/600', alt: 'Portrét detail', category: 'Portrét', aspectRatio: '3/4' },
    { src: 'https://picsum.photos/seed/pw02/480/600', alt: 'Svatební den', category: 'Svatba', aspectRatio: '4/5' },
    { src: 'https://picsum.photos/seed/pr02/600/400', alt: 'Město reportáž', category: 'Reportáž', aspectRatio: '3/2' },
    { src: 'https://picsum.photos/seed/ppd02/600/450', alt: 'Produktová fotografie', category: 'Produkt', aspectRatio: '4/3' },
    { src: 'https://picsum.photos/seed/pp03/400/600', alt: 'Módní portrét', category: 'Portrét', aspectRatio: '2/3' },
    { src: 'https://picsum.photos/seed/pw03/600/400', alt: 'Novomanželé', category: 'Svatba', aspectRatio: '3/2' },
    { src: 'https://picsum.photos/seed/pr03/800/450', alt: 'Zimní krajina', category: 'Reportáž', aspectRatio: '16/9' },
    { src: 'https://picsum.photos/seed/ppd03/600/450', alt: 'Káva produkt', category: 'Produkt', aspectRatio: '4/3' },
    { src: 'https://picsum.photos/seed/pp04/450/600', alt: 'Portrét ženy', category: 'Portrét', aspectRatio: '3/4' },
    { src: 'https://picsum.photos/seed/pw04/600/400', alt: 'Svatební obřad', category: 'Svatba', aspectRatio: '3/2' },
    { src: 'https://picsum.photos/seed/pp05/400/600', alt: 'Portrét exteriér', category: 'Portrét', aspectRatio: '2/3' },
    { src: 'https://picsum.photos/seed/ppd04/600/450', alt: 'Květiny produkt', category: 'Produkt', aspectRatio: '4/3' },
    { src: 'https://picsum.photos/seed/pp06/600/600', alt: 'Portrét studio', category: 'Portrét', aspectRatio: '1/1' },
    { src: 'https://picsum.photos/seed/pr04/800/450', alt: 'Krajina západ', category: 'Reportáž', aspectRatio: '16/9' },
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