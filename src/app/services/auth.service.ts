import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';

// Interface für Benutzer
export interface User {
  id: number;
  username: string;
  email: string;
  phone_number?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; // Basis-URL für Authentifizierungsendpunkte
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); // Beobachtet den Login-Status

  constructor(private http: HttpClient) {}

  // Überprüft, ob ein Token vorhanden ist
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Erstellt Auth-Header mit dem gespeicherten Token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Token ${token}`,
    });
  }

  // Gibt den aktuellen Login-Status als Observable zurück
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Login-Funktion
  login(data: { username: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login/`, data).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token); // Speichert den Token
        this.loggedIn.next(true); // Login-Status auf true setzen
      })
    );
  }

  // Logout-Funktion
  logout(): void {
    localStorage.removeItem('authToken'); // Entfernt Token aus dem Speicher
    this.loggedIn.next(false); // Login-Status auf false setzen
  }

  // Registrierung eines neuen Benutzers
  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, data);
  }

  // Abrufen der Benutzerprofil-Daten
  getUserDetails(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/profile/`, { headers });
  }

  // Aktualisieren der Benutzerdaten
  updateUserDetails(user: Partial<User>): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/profile/`, user, { headers });
  }
}
