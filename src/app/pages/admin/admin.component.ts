import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import type { PortfolioContent, PricingContent } from '../../core/services/content.service';

// Change this password before deploying
const ADMIN_PASSWORD = 'foto2025';

type Tab = 'portfolio' | 'pricing' | 'faq';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private contentService = inject(ContentService);

  isLoggedIn = signal(false);
  passwordInput = '';
  passwordError = signal(false);
  activeTab = signal<Tab>('portfolio');
  toast = signal('');

  portfolioData: PortfolioContent | null = null;
  pricingData: PricingContent | null = null;

  newPhoto = { src: '', alt: '', category: 'Portrét', aspectRatio: '3/4' };
  showAddPhoto = false;

  aspectRatios = [
    { value: '1/1', label: '1:1 (čtverec)' },
    { value: '3/4', label: '3:4 (na výšku)' },
    { value: '2/3', label: '2:3 (na výšku)' },
    { value: '4/5', label: '4:5 (na výšku)' },
    { value: '4/3', label: '4:3 (na šířku)' },
    { value: '3/2', label: '3:2 (na šířku)' },
    { value: '16/9', label: '16:9 (panorama)' },
  ];

  ngOnInit() {
    if (sessionStorage.getItem('admin_session') === 'true') {
      this.isLoggedIn.set(true);
      this.loadContent();
    }
  }

  login() {
    if (this.passwordInput === ADMIN_PASSWORD) {
      this.isLoggedIn.set(true);
      this.passwordError.set(false);
      sessionStorage.setItem('admin_session', 'true');
      this.loadContent();
    } else {
      this.passwordError.set(true);
    }
  }

  logout() {
    sessionStorage.removeItem('admin_session');
    this.isLoggedIn.set(false);
    this.portfolioData = null;
    this.pricingData = null;
  }

  private loadContent() {
    this.contentService.getPortfolio().subscribe(data => {
      this.portfolioData = JSON.parse(JSON.stringify(data));
    });
    this.contentService.getPricing().subscribe(data => {
      this.pricingData = JSON.parse(JSON.stringify(data));
    });
  }

  // --- Save / Download / Reset ---

  savePortfolio() {
    if (this.portfolioData) {
      this.contentService.savePortfolio(this.portfolioData);
      this.showToast('Fotografie uloženy. Změny jsou okamžitě aktivní.');
    }
  }

  savePricing() {
    if (this.pricingData) {
      this.contentService.savePricing(this.pricingData);
      this.showToast('Ceník uložen. Změny jsou okamžitě aktivní.');
    }
  }

  downloadPortfolio() {
    if (this.portfolioData) {
      this.contentService.downloadJson(this.portfolioData, 'portfolio.json');
    }
  }

  downloadPricing() {
    if (this.pricingData) {
      this.contentService.downloadJson(this.pricingData, 'pricing.json');
    }
  }

  resetPortfolio() {
    if (!confirm('Obnovit výchozí fotografie? Všechny neuložené změny budou ztraceny.')) return;
    this.contentService.resetPortfolio().subscribe(data => {
      this.portfolioData = JSON.parse(JSON.stringify(data));
      this.showToast('Fotografie obnoveny ze souboru.');
    });
  }

  resetPricing() {
    if (!confirm('Obnovit výchozí ceník? Všechny neuložené změny budou ztraceny.')) return;
    this.contentService.resetPricing().subscribe(data => {
      this.pricingData = JSON.parse(JSON.stringify(data));
      this.showToast('Ceník obnoven ze souboru.');
    });
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 4000);
  }

  // --- Portfolio ---

  addPhoto() {
    if (!this.portfolioData || !this.newPhoto.src || !this.newPhoto.alt) return;
    this.portfolioData.photos.push({ ...this.newPhoto });
    this.newPhoto = { src: '', alt: '', category: this.portfolioData.categories[1] ?? 'Portrét', aspectRatio: '3/4' };
    this.showAddPhoto = false;
  }

  deletePhoto(i: number) {
    this.portfolioData?.photos.splice(i, 1);
  }

  movePhoto(i: number, dir: -1 | 1) {
    if (!this.portfolioData) return;
    const arr = this.portfolioData.photos;
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  addCategory() {
    this.portfolioData?.categories.push('');
  }

  deleteCategory(i: number) {
    this.portfolioData?.categories.splice(i, 1);
  }

  // --- Pricing ---

  addPackageItem(pi: number) {
    this.pricingData?.packages[pi].items.push('');
  }

  removePackageItem(pi: number, ii: number) {
    this.pricingData?.packages[pi].items.splice(ii, 1);
  }

  addPackage() {
    this.pricingData?.packages.push({ name: 'Nový balíček', price: '0', unit: 'Kč', desc: '', items: [], highlight: false });
  }

  deletePackage(i: number) {
    this.pricingData?.packages.splice(i, 1);
  }

  // --- FAQ ---

  addFaq() {
    this.pricingData?.faq.push({ question: '', answer: '' });
  }

  deleteFaq(i: number) {
    this.pricingData?.faq.splice(i, 1);
  }

  moveFaq(i: number, dir: -1 | 1) {
    if (!this.pricingData) return;
    const arr = this.pricingData.faq;
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
