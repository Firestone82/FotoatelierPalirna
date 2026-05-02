import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Photo {
  src: string;
  alt: string;
  category: string;
  aspectRatio: string;
}

export interface PortfolioContent {
  categories: string[];
  photos: Photo[];
}

export interface Package {
  name: string;
  price: string;
  unit: string;
  desc: string;
  items: string[];
  highlight: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingContent {
  packages: Package[];
  faq: FaqItem[];
}

const STORAGE_KEY_PORTFOLIO = 'content_portfolio';
const STORAGE_KEY_PRICING = 'content_pricing';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  getPortfolio(): Observable<PortfolioContent> {
    const saved = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
    if (saved) {
      try {
        return of(JSON.parse(saved) as PortfolioContent);
      } catch {
        localStorage.removeItem(STORAGE_KEY_PORTFOLIO);
      }
    }
    return this.http.get<PortfolioContent>('content/portfolio.json');
  }

  getPricing(): Observable<PricingContent> {
    const saved = localStorage.getItem(STORAGE_KEY_PRICING);
    if (saved) {
      try {
        return of(JSON.parse(saved) as PricingContent);
      } catch {
        localStorage.removeItem(STORAGE_KEY_PRICING);
      }
    }
    return this.http.get<PricingContent>('content/pricing.json');
  }

  savePortfolio(data: PortfolioContent): void {
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(data));
  }

  savePricing(data: PricingContent): void {
    localStorage.setItem(STORAGE_KEY_PRICING, JSON.stringify(data));
  }

  resetPortfolio(): Observable<PortfolioContent> {
    localStorage.removeItem(STORAGE_KEY_PORTFOLIO);
    return this.http.get<PortfolioContent>('content/portfolio.json');
  }

  resetPricing(): Observable<PricingContent> {
    localStorage.removeItem(STORAGE_KEY_PRICING);
    return this.http.get<PricingContent>('content/pricing.json');
  }

  downloadJson(data: unknown, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
