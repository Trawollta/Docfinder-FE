import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card.component';
import { Doctor } from '../../doctors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, DoctorCardComponent],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const specialty = params.get('specialty');
      specialty 
        ? this.loadDoctors(specialty)
        : console.error('Keine gültige Fachrichtung gefunden!');
    });
  }

  
async loadDoctors(specialty: string): Promise<void> {
  try {
    const data = await firstValueFrom(this.doctorService.getDoctorsBySpecialty(specialty));
    this.doctors = data || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Ärzte:', error);
  }
}
}
