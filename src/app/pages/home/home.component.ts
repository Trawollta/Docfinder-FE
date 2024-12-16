import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/categories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.doctorService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Fehler beim Laden der Kategorien:', error)
    );
  }

  goToCategory(category: string): void {
    if (!category) return console.error('Ungültige Kategorie!');
    this.router.navigate(['/doctors', category]);
  }
}
