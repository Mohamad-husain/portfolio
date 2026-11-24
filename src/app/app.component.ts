import { AfterViewInit, Component, DestroyRef, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio';
  @ViewChild('pageContent') private pageContent?: ElementRef<HTMLElement>;
  private readonly destroyRef = inject(DestroyRef);
  private frame = 0;
  private navigationFrame = 0;
  private readonly updateScroll = () => {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const root = document.documentElement;
      const distance = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', String(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0));
      root.classList.toggle('page-scrolled', window.scrollY > 24);
      root.classList.toggle('show-back-top', window.scrollY > 550);
    });
  };

  constructor(private router: Router, private zone: NgZone, private pageTitle: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const segment = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean)[0] || 'home';
      this.pageTitle.setTitle(`${segment.charAt(0).toUpperCase() + segment.slice(1)} | Mohammad Hussain`);
      cancelAnimationFrame(this.navigationFrame);
      this.navigationFrame = requestAnimationFrame(() => {
        this.pageContent?.nativeElement.focus({ preventScroll: true });
        this.updateScroll();
      });
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.updateScroll, { passive: true });
      window.addEventListener('resize', this.updateScroll, { passive: true });
      this.updateScroll();
    });
  }

  backToTop(): void {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    this.pageContent?.nativeElement.focus({ preventScroll: true });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    cancelAnimationFrame(this.navigationFrame);
    window.removeEventListener('scroll', this.updateScroll);
    window.removeEventListener('resize', this.updateScroll);
  }
}
