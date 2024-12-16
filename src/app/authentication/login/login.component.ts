import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.username && this.password) {
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: (response) => {
          console.log('Login erfolgreich:', response);
          this.router.navigate(['/home']); // Nach erfolgreichem Login weiterleiten
        },
        error: (error) => {
          console.error('Login fehlgeschlagen:', error);
          alert('Benutzername oder Passwort ist falsch.');
        },
      });
    } else {
      alert('Bitte alle Felder ausfüllen.');
    }
  }
}
