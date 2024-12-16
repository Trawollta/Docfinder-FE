import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { CommonModule } from '@angular/common';// Importiere das Interface
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-myappointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.scss']
})
export class MyappointmentsComponent implements OnInit {
  appointments: Appointment[] = []; // Typisiere das Array

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentsService.getMyAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data; // Direkt zuweisen, wenn die API die korrekten Daten liefert
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}