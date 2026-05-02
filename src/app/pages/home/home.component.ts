import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  services = [
    { icon: '◎', title: 'Portrét', desc: 'Autentické portréty zachycující osobnost a náladu. Ve studiu i v přírodě.' },
    { icon: '◇', title: 'Svatba', desc: 'Reportážní dokumentace vašeho velkého dne – od příprav po první tanec.' },
    { icon: '○', title: 'Produkt', desc: 'Profesionální produktová fotografie pro e-shopy, katalogy a marketing.' },
    { icon: '△', title: 'Reportáž', desc: 'Živé zachycení událostí, firemních akcí a kulturních pořadů.' },
  ];

  galleryImages = [
    { src: 'https://picsum.photos/seed/gp01/400/600', alt: 'Portrét', category: 'Portrét', aspectRatio: '2/3' },
    { src: 'https://picsum.photos/seed/gw01/600/400', alt: 'Svatba', category: 'Svatba', aspectRatio: '3/2' },
    { src: 'https://picsum.photos/seed/gp02/450/600', alt: 'Portrét ženy', category: 'Portrét', aspectRatio: '3/4' },
    { src: 'https://picsum.photos/seed/gr01/800/450', alt: 'Krajina', category: 'Reportáž', aspectRatio: '16/9' },
    { src: 'https://picsum.photos/seed/gpd01/600/600', alt: 'Produkt', category: 'Produkt', aspectRatio: '1/1' },
    { src: 'https://picsum.photos/seed/gp03/400/600', alt: 'Portrét exteriér', category: 'Portrét', aspectRatio: '2/3' },
  ];

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
  }
}