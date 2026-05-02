import { Component, Input, ElementRef, AfterViewInit, signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lazy-image',
  imports: [NgClass],
  template: `
    <div class="lazy-img-wrapper" [class]="wrapperClass">
      <div class="lazy-img-placeholder" [class.hidden]="loaded()"></div>
      <img
        [src]="loaded() ? src : ''"
        [attr.data-src]="src"
        [alt]="alt"
        [ngClass]="{'loaded': loaded()}"
        class="lazy-img"
        (load)="onLoad()"
      />
    </div>
  `,
  styleUrl: './lazy-image.component.scss'
})
export class LazyImageComponent implements AfterViewInit {
  @Input() src = '';
  @Input() alt = '';
  @Input() wrapperClass = '';

  loaded = signal(false);
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loaded.set(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1, rootMargin: '200px' });

    observer.observe(this.el.nativeElement);
  }

  onLoad() {
    this.loaded.set(true);
  }
}