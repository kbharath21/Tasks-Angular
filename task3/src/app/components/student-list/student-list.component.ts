import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})

export class StudentListComponent implements OnInit {

  // Inject the CustomerService
  private studentService = inject(StudentService);

  //Customers list
  students!: Student[];
  ngOnInit(): void{
    this.studentService.get().subscribe(
      data => {
        console.log('Students:',data);
        this.students = data;
      },
      error => {
        console.log('Error:',error);
      }
    );
  }

  
  onDeleteClick(studentId: number | undefined): void {
    if (studentId !== undefined) { // Ensure the id is valid
      this.studentService.delete(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.id !== studentId);
      });
    }
  }
  

}