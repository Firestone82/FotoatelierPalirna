import { Component, Input, OnInit } from '@angular/core';

/**
 * Renders an email link from a base64-encoded address so the raw email
 * never appears in the HTML source, defeating naive bot scrapers.
 *
 * Usage: <app-obfuscated-email encoded="YWhvakBwYWxpcm5hLmN6" />
 *   where encoded = btoa('ahoj@palirna.cz')
 */
@Component({
  selector: 'app-obfuscated-email',
  template: `<a [href]="mailtoLink" [class]="linkClass">{{ displayText }}</a>`,
})
export class ObfuscatedEmailComponent implements OnInit {
  @Input({ required: true }) encoded!: string;
  @Input() linkClass: string = '';

  mailtoLink: string = '';
  displayText: string = '';

  ngOnInit(): void {
    const email: string = atob(this.encoded);
    this.mailtoLink = `mailto:${email}`;
    this.displayText = email;
  }
}
