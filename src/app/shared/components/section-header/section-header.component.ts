import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div>
      <span class="section-label">{{ label }}</span>
      <h2 class="section-header__title font-site-serif font-normal leading-[1.1] text-site-text max-w-[700px] mt-4 text-[clamp(36px,5vw,62px)]">
        <ng-content></ng-content>
      </h2>
      @if (description) {
        <p class="mt-6 max-w-[440px] text-[15px] text-site-muted leading-[1.7]">{{ description }}</p>
      }
    </div>
  `,
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() label: string = '';
  @Input() description: string = '';
}
