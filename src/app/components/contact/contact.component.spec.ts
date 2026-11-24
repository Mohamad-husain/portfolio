import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves the message and exposes the provider reason when delivery fails', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.reject({ status: 412, text: 'Gmail_API: authentication required' }));
    component.form = { name: 'Test visitor', email: 'visitor@example.com', message: 'A test enquiry' };
    const resetForm = jasmine.createSpy('resetForm');
    await component.submit({ invalid: false, resetForm } as unknown as NgForm);
    expect(component.status).toBe('error');
    expect(component.isSubmitting).toBeFalse();
    expect(component.deliveryDetails).toContain('412');
    expect(component.deliveryDetails).toContain('authentication required');
    expect(component.form.message).toBe('A test enquiry');
    expect(resetForm).not.toHaveBeenCalled();
    expect(decodeURIComponent(component.emailDraftUrl)).toContain('A test enquiry');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.delivery-fallback a')).toBeTruthy();
  });

  it('shows success and clears the form only after confirmed delivery', async () => {
    const send = spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));
    component.form = { name: ' Test visitor ', email: ' visitor@example.com ', message: ' A test enquiry ' };
    const resetForm = jasmine.createSpy('resetForm');
    await component.submit({ invalid: false, resetForm } as unknown as NgForm);
    expect(component.status).toBe('success');
    expect(component.isSubmitting).toBeFalse();
    expect(resetForm).toHaveBeenCalled();
    expect(send.calls.mostRecent().args[2]).toEqual({ from_name: 'Test visitor', from_email: 'visitor@example.com', reply_to: 'visitor@example.com', message: 'A test enquiry' });
  });

  it('prevents duplicate requests while a message is being sent', async () => {
    const send = spyOn(emailjs, 'send').and.returnValue(new Promise(() => {}));
    const formRef = { invalid: false, resetForm: jasmine.createSpy('resetForm') } as unknown as NgForm;
    void component.submit(formRef);
    await component.submit(formRef);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('gives retry guidance when the provider rate limit is reached', async () => {
    spyOn(emailjs, 'send').and.returnValue(Promise.reject({ status: 429, text: 'Rate limit' }));
    await component.submit({ invalid: false } as NgForm);
    expect(component.status).toBe('error');
    expect(component.errorMessage).toContain('wait');
  });
});
