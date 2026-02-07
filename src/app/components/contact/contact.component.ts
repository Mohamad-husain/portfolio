import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  async submit(formRef: NgForm): Promise<void> {
    if (this.isSubmitting || formRef.invalid) {
      return;
    }

    const emailConfig = environment.emailjs;
    if (
      !emailConfig?.serviceId ||
      !emailConfig?.templateId ||
      !emailConfig?.publicKey ||
      emailConfig.serviceId.startsWith('YOUR_') ||
      emailConfig.templateId.startsWith('YOUR_') ||
      emailConfig.publicKey.startsWith('YOUR_')
    ) {
      this.status = 'error';
      this.errorMessage = 'EmailJS config is missing. Please update environment.ts.';
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
          from_name: this.form.name,
          from_email: this.form.email,
          message: this.form.message,
          reply_to: this.form.email
        },
        emailConfig.publicKey
      );

      this.status = 'success';
      formRef.resetForm();
    } catch (error) {
      this.status = 'error';
      this.errorMessage = 'Failed to send message. Please try again later.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
