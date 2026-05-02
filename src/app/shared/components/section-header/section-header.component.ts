import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div class="section-header">
      <span class="section-label">{{ label }}</span>
      <h2 class="section-header__title">
        <ng-content></ng-content>
      </h2>
      @if (description) {
        <p class="section-header__desc">{{ description }}</p>
      }
    </div>
  `,
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() label = '';
  @Input() description = '';
}