import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Benutzerdaten:', error);
      },
    });
  }

  updateUser(): void {
    if (!this.user) return;
    this.authService.updateUserDetails(this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        alert('Daten erfolgreich gespeichert!');
      },
      error: (error) => {
        console.error('Fehler beim Speichern der Benutzerdaten:', error);
        alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
      },
    });
  }
}
