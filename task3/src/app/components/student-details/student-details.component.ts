import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  imports: [
    CommonModule
  ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {

  private activatedRouter = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  student!: Student;
  private studentId?: string;

  ngOnInit(): void {
    // Get Student ID from URL
    this.studentId = this.activatedRouter.snapshot.params?.['id'];

    if (!this.studentId) {
      console.warn('No student ID found in URL.');
      return;
    }

    console.log('Fetching details for Student ID:', this.studentId);

    // Fetch student details
    this.studentService.getById(this.studentId).subscribe(
      (data) => {
        this.student = data;
        console.log('Student data fetched:', this.student);
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
}
