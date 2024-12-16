import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Token aus dem localStorage holen
    return new HttpHeaders({
      Authorization: `Token ${token}`, // Auth-Token im Header setzen
    });
  }

  // Termine eines bestimmten Arztes abrufen
  getAppointmentsByDoctor(doctorId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/doctor/${doctorId}/`, { headers });
  }

  // Termin für einen bestimmten Arzt hinzufügen
  addAppointment(doctorId: string, appointmentData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/doctor/${doctorId}/create/`, appointmentData, { headers });
  }

  // Eigene Termine abrufen
  getMyAppointments(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/doctors/');
  }
}
