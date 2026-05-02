import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal') revealEls!: QueryList<ElementRef>;

  services = [
    { icon: '◎', title: 'Portrét', desc: 'Autentické portréty zachycující osobnost a náladu. Ve studiu i v přírodě.' },
    { icon: '◇', title: 'Svatba', desc: 'Reportážní dokumentace vašeho velkého dne – od příprav po první tanec.' },
    { icon: '○', title: 'Produkt', desc: 'Profesionální produktová fotografie pro e-shopy, katalogy a marketing.' },
    { icon: '△', title: 'Reportáž', desc: 'Živé zachycení událostí, firemních akcí a kulturních pořadů.' },
  ];

  galleryImages = [
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Portrét', category: 'Portrét' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Svatba', category: 'Svatba' },
    { src: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80', alt: 'Reportáž', category: 'Reportáž' },
    { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', alt: 'Produkt', category: 'Produkt' },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Krajina', category: 'Reportáž' },
    { src: 'https://images.unsplash.com/photo-1616169201999-849843cf88fc?w=800&q=80', alt: 'Portrét 2', category: 'Portrét' },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
  }
}