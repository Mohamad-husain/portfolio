import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLFormElement>;

  sendEmail() {
    if (this.contactForm) {
      emailjs.sendForm(
        environment.emailServiceId,
        environment.emailTemplateId,
        this.contactForm.nativeElement,
        environment.emailPublicKey
      ).then(
        () => {
          alert('Message sent successfully!');
          this.contactForm.nativeElement.reset();
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.log(error.text);
        }
      );
    }
  }
}
