import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLFormElement>;  // الحصول على الفورم HTML

  sendEmail() {
    if (this.contactForm) {
      emailjs.sendForm(
        'service_ma6i7kc',
        'template_3zj0ubu',
        this.contactForm.nativeElement,   // ✅ هنا نمرر العنصر HTML مباشرة
        'K4_GaG8asrg_lmMZS'
      ).then(
        (result) => {
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
