import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  doctorId: string | null = null;
  doctorName: string | null = null; // Name des Arztes
  appointments: any[] = [];

  newAppointment: any = {
    doctor_id: null,
    date: '',
    start_time: '',
    end_time: '',
    is_booked: false,
    booked_by: null,
  };

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((params) => {
      this.doctorName = params['name']; // Arztnamen aus den Query-Parametern erhalten
    });

    if (this.doctorId) {
      this.loadAppointments(this.doctorId);
    } else {
      console.error('Keine gültige Arzt-ID gefunden!');
    }
  }

  loadAppointments(doctorId: string): void {
    this.appointmentsService.getAppointmentsByDoctor(doctorId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Termine:', error);
      },
    });
  }

  addAppointment(): void {
    if (!this.doctorId) {
      console.error('Keine Arzt-ID verfügbar!');
      return;
    }

    this.newAppointment.doctor_id = this.doctorId;

    this.appointmentsService.addAppointment(this.doctorId, this.newAppointment).subscribe({
      next: (response) => {
        this.appointments.push(response);
        this.newAppointment = { doctor_id: this.doctorId, date: '', start_time: '', end_time: '', is_booked: false, booked_by: null };
      },
      error: (error) => {
        console.error('Fehler beim Erstellen des Termins:', error);
      },
    });
  }
}
