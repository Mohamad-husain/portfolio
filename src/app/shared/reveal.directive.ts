import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private preference?: MediaQueryList;
  private readonly show = () => {
    this.element.nativeElement.classList.add('motion-visible');
    this.observer?.unobserve(this.element.nativeElement);
  };

  constructor(private element: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (this.preference.matches || !('IntersectionObserver' in window)) return;
      this.observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) this.show();
      }, { threshold: 0.08 });
      this.element.nativeElement.classList.add('motion-ready');
      this.observer.observe(this.element.nativeElement);
      this.preference.addEventListener('change', this.show);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.preference?.removeEventListener('change', this.show);
  }
}

@Directive({ selector: '[appSpotlight]', standalone: true })
export class SpotlightDirective implements AfterViewInit, OnDestroy {
  private frame = 0;
  private readonly move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const node = this.element.nativeElement;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  };

  constructor(private element: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.element.nativeElement.addEventListener('pointermove', this.move, { passive: true }));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.element.nativeElement.removeEventListener('pointermove', this.move);
  }
}
