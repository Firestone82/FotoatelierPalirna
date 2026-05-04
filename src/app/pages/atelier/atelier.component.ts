import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'app-atelier',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss'
})
export class AtelierComponent implements AfterViewInit {
  photos = [
    { src: 'https://picsum.photos/seed/atelier-hall/1200/800',    alt: 'Hlavní prostor ateliéru',              wide: true  },
    { src: 'https://picsum.photos/seed/atelier-window/700/700',   alt: 'Severní okno s přirozeným světlem',    wide: false },
    { src: 'https://picsum.photos/seed/atelier-bricks/700/700',   alt: 'Cihlová stěna – pozadí pro focení',    wide: false },
    { src: 'https://picsum.photos/seed/atelier-lights/1200/800',  alt: 'Studiové světelné vybavení',           wide: true  },
    { src: 'https://picsum.photos/seed/atelier-corner/700/700',   alt: 'Odpočinkový koutek pro klienty',       wide: false },
    { src: 'https://picsum.photos/seed/atelier-backdrop/700/700', alt: 'Papírové pozadí – bílé a šedé',        wide: false },
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
      }, { threshold: 0.08 }).observe(el);
    });
  }
}
