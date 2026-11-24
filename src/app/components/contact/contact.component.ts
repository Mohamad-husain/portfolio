import { RevealDirective, SpotlightDirective } from '../../shared/reveal.directive';
import { CommonModule } from '@angular/common';
import { Component, isDevMode } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective, SpotlightDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  errorMessage = '';
  deliveryDetails = '';
  readonly showDiagnostics = isDevMode();

  get emailDraftUrl(): string {
    const subject = `Portfolio enquiry from ${this.form.name.trim() || 'a visitor'}`;
    const body = `${this.form.message.trim()}\n\nFrom: ${this.form.name.trim()}\nReply to: ${this.form.email.trim()}`;
    return `mailto:mohammad.hussain.se@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async submit(formRef: NgForm): Promise<void> {
    if (this.isSubmitting || formRef.invalid) {
      return;
    }

    const emailConfig = environment.emailjs;
    this.deliveryDetails = '';
    if (
      !emailConfig?.serviceId ||
      !emailConfig?.templateId ||
      !emailConfig?.publicKey ||
      emailConfig.serviceId.startsWith('YOUR_') ||
      emailConfig.templateId.startsWith('YOUR_') ||
      emailConfig.publicKey.startsWith('YOUR_')
    ) {
      this.status = 'error';
      this.errorMessage = 'The contact form is temporarily unavailable. Please reach me through WhatsApp or email.';
      return;
    }

    this.isSubmitting = true;
    this.status = 'idle';
    this.errorMessage = '';

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: this.form.name.trim(),
          from_email: this.form.email.trim(),
          message: this.form.message.trim(),
          reply_to: this.form.email.trim()
        },
        emailConfig.publicKey
      );

      this.status = 'success';
      formRef.resetForm();
    } catch (error) {
      this.status = 'error';
      const response = error && typeof error === 'object' ? error as { status?: unknown; text?: unknown } : {};
      const code = typeof response.status === 'number' ? response.status : 0;
      if (code === 429) {
        this.errorMessage = 'Too many sending attempts. Please wait a little before retrying, or contact me by email.';
      } else if (code === 0) {
        this.errorMessage = 'Could not reach the email service. Please check your connection or use email instead.';
      } else {
        this.errorMessage = 'The email service could not deliver your message. Your text is still here — please use email or WhatsApp instead.';
      }
      if (this.showDiagnostics) {
        const detail = typeof response.text === 'string' ? response.text.slice(0, 1000) : 'No response details available.';
        this.deliveryDetails = `EmailJS ${code || 'network error'}: ${detail}`;
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
