import { Component } from '@angular/core';
import { FormStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegistrationData } from '../../models/registrationdata';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  
  registerData: RegistrationData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService) {}

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Die Passwörter stimmen nicht überein!');
      return;
    }
  
    console.log('Daten für Registrierung:', this.registerData); // Werte prüfen
    this.authService.register(this.registerData).subscribe(
      (response) => {
        alert('Registrierung erfolgreich!');
        console.log('Erfolgreich registriert:', response);
      },
      (error) => {
        alert('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        console.error('Fehler bei der Registrierung:', error);
      }
    );
  }
}
