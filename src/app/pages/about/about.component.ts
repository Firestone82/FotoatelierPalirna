import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';

interface Stat {
  num: string;
  label: string;
}

interface GearGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, LazyImageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  readonly stats: Stat[] = [
    { num: '8+', label: 'Let praxe' },
    { num: '200+', label: 'Svateb' },
    { num: '12', label: 'Publikací' },
  ];

  readonly gear: GearGroup[] = [
    {
      category: 'Těla',
      items: ['Sony α7 IV', 'Sony α7R V'],
    },
    {
      category: 'Objektivy',
      items: ['Sony FE 85mm f/1.4 GM', 'Sony FE 24–70mm f/2.8 GM II', 'Sony FE 70–200mm f/2.8 GM II', 'Zeiss Batis 55mm f/1.8'],
    },
    {
      category: 'Světla & grip',
      items: ['Godox AD600 Pro', 'Godox V1 (2×)', 'Softbox Octa 120 cm', 'Peak Design Travel Tripod'],
    },
    {
      category: 'Post-produkce',
      items: ['Adobe Lightroom Classic', 'Adobe Photoshop', 'Capture One', 'Calibrite ColorChecker'],
    },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
  }
}
