import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Service wird global bereitgestellt
})
export class DoctorService {
  private apiUrl = 'http://127.0.0.1:8000/doctors/list/'; 

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    const url = 'http://127.0.0.1:8000/categories/';
    return this.http.get<any[]>(url);
  }
  
  getDoctorsByCategory(specialty: string): Observable<any[]> {
    const url = `http://127.0.0.1:8000/specialty/${specialty}/`;
    return this.http.get<any[]>(url);
  }

  getDoctorsBySpecialty(specialty: string): Observable<any[]> {
    const url = `http://127.0.0.1:8000/doctors/specialty/${specialty}/`;
    return this.http.get<any[]>(url);
}

  getDoctorById(id: string): Observable<any> {
    const url = `http://127.0.0.1:8000/doctors/doctor/${id}/`;
    console.log('Request URL:', url); // Debug-Ausgabe
    return this.http.get<any>(url);
  }

  // getDoctors(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // getAppointmentsByDoctor(doctorId: number): Observable<any[]> {
  //   const url = `${this.apiUrl}/appointments/doctor/${doctorId}/`;
  //   return this.http.get<any[]>(url);
  // }

  // createAppointment(doctorId: number, appointmentData: any): Observable<any> {
  //   const url = `${this.apiUrl}/appointments/doctor/${doctorId}/create/`;
  //   return this.http.post<any>(url, appointmentData);
  // }

  
}
