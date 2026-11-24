import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('Portfolio navigation and interactions', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  async function visit(url: string): Promise<HTMLElement> {
    await router.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('navigates to the compact About page with the six-month QA training', async () => {
    const page = await visit('/about');
    expect(page.querySelector('main h1')?.textContent).toContain('About Me');
    expect(page.querySelector('#quality-title')?.textContent).toContain('Asal Technologies');
    expect(page.querySelector('.duration')?.textContent).toContain('6');
    expect(page.querySelectorAll('.bio').length).toBe(1);
    expect(document.title).toBe('About | Mohammad Hussain');
  });

  it('keeps Flutter and React Native in the Front-End skill group', async () => {
    const page = await visit('/skills');
    const frontend = Array.from(page.querySelectorAll('.skill-group')).find(group => group.textContent?.includes('Front-End'));
    expect(frontend?.textContent).toContain('Flutter');
    expect(frontend?.textContent).toContain('React Native');
  });

  it('keeps the campus app first and renders all six project cards', async () => {
    const page = await visit('/projects');
    expect(page.querySelectorAll('.project-card').length).toBe(6);
    expect(page.querySelector('.project-title')?.textContent).toContain('Kolshi B Jam3etna');
    expect(page.querySelector('.project-card a')?.getAttribute('href')).toContain('Kolshe-Bjam3etna');
  });

  it('rejects malformed email addresses before enabling message submission', async () => {
    const page = await visit('/contact');
    const update = (selector: string, value: string) => {
      const field = page.querySelector(selector) as HTMLInputElement;
      field.value = value;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('blur'));
    };
    update('#contact-name', 'Portfolio visitor');
    update('#contact-message', 'I would like to discuss a project.');
    update('#contact-email', 'invalid-address');
    fixture.detectChanges();
    expect((page.querySelector('button[type="submit"]') as HTMLButtonElement).disabled).toBeTrue();
    expect(page.querySelector('#email-error')?.textContent).toContain('valid email');
    update('#contact-email', 'visitor@example.com');
    fixture.detectChanges();
    expect((page.querySelector('button[type="submit"]') as HTMLButtonElement).disabled).toBeFalse();
  });

  it('closes mobile navigation with Escape and keeps the WhatsApp link', async () => {
    const page = await visit('/home');
    const toggle = page.querySelector('.navbar-toggler') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(page.querySelector('footer a.whatsapp')?.getAttribute('href')).toBe('https://wa.me/972598610880');
  });
});
