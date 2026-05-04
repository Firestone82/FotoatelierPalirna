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
    { icon: '◎', title: 'Portrét', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.' },
    { icon: '◇', title: 'Svatba', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { icon: '○', title: 'Produkt', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { icon: '△', title: 'Reportáž', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.' },
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