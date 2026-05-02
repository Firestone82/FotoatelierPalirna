import { Component, AfterViewInit, ElementRef, ViewChild, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

const ALL_GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Portrét', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Svatba', category: 'Svatba', aspectRatio: '3/2' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80', alt: 'Portrét ženy', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Krajina', category: 'Reportáž', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', alt: 'Produkt', category: 'Produkt', aspectRatio: '1/1' },
  { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80', alt: 'Portrét 3', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=800&q=80', alt: 'Svatba 2', category: 'Svatba', aspectRatio: '4/3' },
  { src: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80', alt: 'Reportáž', category: 'Reportáž', aspectRatio: '4/3' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'Portrét 4', category: 'Portrét', aspectRatio: '1/1' },
  { src: 'https://images.unsplash.com/photo-1616169201999-849843cf88fc?w=800&q=80', alt: 'Portrét 5', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc31?w=800&q=80', alt: 'Produkt 2', category: 'Produkt', aspectRatio: '4/3' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', alt: 'Svatba 3', category: 'Svatba', aspectRatio: '1/1' },
  { src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80', alt: 'Portrét 6', category: 'Portrét', aspectRatio: '2/3' },
  { src: 'https://images.unsplash.com/photo-1444727747799-f8a2af1b5c51?w=800&q=80', alt: 'Krajina 2', category: 'Reportáž', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', alt: 'Portrét 7', category: 'Portrét', aspectRatio: '3/4' },
  { src: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80', alt: 'Produkt 3', category: 'Produkt', aspectRatio: '4/5' },
];

const INITIAL_COUNT = 8;
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