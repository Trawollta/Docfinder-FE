import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss',
})
export class DoctorDetailComponent implements OnInit {
  doctor: any;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    doctorId 
      ? this.loadDoctorDetails(doctorId) 
      : console.error('Keine Arzt-ID in der URL gefunden!');
  }
  
  async loadDoctorDetails(id: string): Promise<void> {
    try {
      this.doctor = await firstValueFrom(this.doctorService.getDoctorById(id));
    } catch (error) {
      console.error('Fehler beim Laden des Arztes:', error);
      this.doctor = null;
    }
  }

}
