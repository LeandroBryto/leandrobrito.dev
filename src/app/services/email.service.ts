import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() {
    // Inicializar EmailJS com a chave pública
    emailjs.init({
      publicKey: environment.emailjs.publicKey
    });
  }

  async sendEmail(formData: ContactForm): Promise<boolean> {
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'leandrobarreto.barreto@gmail.com' // Seu email de destino
      };

      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      );

      console.log('Email enviado com sucesso:', response);
      return true;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return false;
    }
  }
}