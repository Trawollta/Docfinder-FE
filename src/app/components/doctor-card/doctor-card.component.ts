import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
  @Input() doctor!: { id: number; name: string; specialty: string; location: string };

  constructor(private router: Router) {}

  // Navigiert zur Detailseite des Arztes
  onDoctorClick(): void {
    this.router.navigate(['/appointments', this.doctor.id], {
      queryParams: { name: this.doctor.name },
    });
  }
}
