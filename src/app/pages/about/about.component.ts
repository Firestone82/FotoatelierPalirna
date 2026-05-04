import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  stats = [
    { num: '8+', label: 'Let praxe' },
    { num: '200+', label: 'Svateb' },
    { num: '12', label: 'Publikací' },
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
  }
}