import { Component, AfterViewInit, ElementRef, ViewChild, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

const ALL_GALLERY_IMAGES = [
  { src: 'https://picsum.photos/seed/gp01/400/600', alt: 'Portrét', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://picsum.photos/seed/gw01/600/400', alt: 'Svatba', category: 'Svatba', aspectRatio: '3/2' },
  { src: 'https://picsum.photos/seed/gp02/450/600', alt: 'Portrét ženy', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://picsum.photos/seed/gr01/800/450', alt: 'Krajina', category: 'Reportáž', aspectRatio: '16/9' },
  { src: 'https://picsum.photos/seed/gpd01/600/600', alt: 'Produkt', category: 'Produkt', aspectRatio: '1/1' },
  { src: 'https://picsum.photos/seed/gp03/400/600', alt: 'Portrét exteriér', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://picsum.photos/seed/gw02/600/450', alt: 'Svatba 2', category: 'Svatba', aspectRatio: '4/3' },
  { src: 'https://picsum.photos/seed/gr02/600/450', alt: 'Reportáž', category: 'Reportáž', aspectRatio: '4/3' },
  { src: 'https://picsum.photos/seed/gp04/600/600', alt: 'Portrét studio', category: 'Portrét', aspectRatio: '1/1' },
  { src: 'https://picsum.photos/seed/gp05/450/600', alt: 'Portrét detail', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://picsum.photos/seed/gpd02/600/450', alt: 'Produkt zátiší', category: 'Produkt', aspectRatio: '4/3' },
  { src: 'https://picsum.photos/seed/gw03/600/600', alt: 'Svatební detail', category: 'Svatba', aspectRatio: '1/1' },
  { src: 'https://picsum.photos/seed/gp06/400/600', alt: 'Portrét venku', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://picsum.photos/seed/gr03/800/450', alt: 'Krajina západ', category: 'Reportáž', aspectRatio: '16/9' },
  { src: 'https://picsum.photos/seed/gp07/450/600', alt: 'Portrét světlo', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://picsum.photos/seed/gpd03/480/600', alt: 'Produkt kosmetika', category: 'Produkt', aspectRatio: '4/5' },
];

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 4;

@Component({
  selector: 'app-home',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('gallerySentinel') gallerySentinel!: ElementRef;

  services = [
    { icon: '◎', title: 'Portrét', desc: 'Autentické portréty zachycující osobnost a náladu. Ve studiu i v přírodě.' },
    { icon: '◇', title: 'Svatba', desc: 'Reportážní dokumentace vašeho velkého dne – od příprav po první tanec.' },
    { icon: '○', title: 'Produkt', desc: 'Profesionální produktová fotografie pro e-shopy, katalogy a marketing.' },
    { icon: '△', title: 'Reportáž', desc: 'Živé zachycení událostí, firemních akcí a kulturních pořadů.' },
  ];

  private displayedCount = signal(INITIAL_COUNT);

  visibleImages = computed(() =>
    ALL_GALLERY_IMAGES.slice(0, this.displayedCount())
  );

  hasMore = computed(() =>
    this.displayedCount() < ALL_GALLERY_IMAGES.length
  );

  ngAfterViewInit() {
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }).observe(el);
    });

    const sentinelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.hasMore()) {
          this.displayedCount.update(n => Math.min(n + LOAD_MORE_COUNT, ALL_GALLERY_IMAGES.length));
        }
      });
    }, { rootMargin: '300px' });

    sentinelObserver.observe(this.gallerySentinel.nativeElement);
  }
}