import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService, ContactForm } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  constructor(private emailService: EmailService) {}

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.showSuccess = false;
      this.showError = false;

      try {
        const success = await this.emailService.sendEmail(this.contactForm);
        
        if (success) {
          this.showSuccess = true;
          this.resetForm(form);
        } else {
          this.showError = true;
          this.errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
        }
      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Erro inesperado. Tente novamente mais tarde.';
        console.error('Erro no envio:', error);
      } finally {
        this.isLoading = false;
        
        // Auto-hide messages after 5 seconds
        setTimeout(() => {
          this.showSuccess = false;
          this.showError = false;
        }, 5000);
      }
    }
  }

  private resetForm(form: NgForm) {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    form.resetForm();
  }
}
