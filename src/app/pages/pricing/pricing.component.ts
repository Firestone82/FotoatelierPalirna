import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Package {
  name: string;
  price: string;
  unit: string;
  desc: string;
  items: string[];
  highlight: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements AfterViewInit {
  packages: Package[] = [
    {
      name: 'Portrét',
      price: '2 900',
      unit: 'Kč / 1 hodina',
      desc: 'Ideální pro individuální nebo párové portréty.',
      items: [
        'Focení na 1 hodinu',
        'Výběr z 80+ fotografií',
        '20 upravených fotek',
        'Soukromá online galerie',
        'Licence pro osobní použití',
      ],
      highlight: false,
    },
    {
      name: 'Svatba',
      price: '18 900',
      unit: 'Kč / celý den',
      desc: 'Kompletní dokumentace vašeho velkého dne od rána do noci.',
      items: [
        'Focení 8–10 hodin',
        'Přípravy + obřad + recepce',
        '400+ upravených fotek',
        'Soukromá online galerie',
        'USB s exportem',
        'Tisková licence',
      ],
      highlight: true,
    },
    {
      name: 'Produkt',
      price: 'od 4 500',
      unit: 'Kč / půl den',
      desc: 'Profesionální fotografie produktů pro web a marketing.',
      items: [
        'Focení 4 hodiny',
        'Jednoduchý i lifestyle setup',
        '30 upravených fotek',
        'Komerční licence',
        'Rychlé dodání do 5 dní',
      ],
      highlight: false,
    },
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