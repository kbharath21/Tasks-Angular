import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add ReactiveFormsModule here
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  @Output() formSubmitted = new EventEmitter<any>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      age: [''],
      gender: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
    });
  }

  onSubmit() {
    this.formSubmitted.emit(this.userForm.value);
    this.userForm.reset();
  }
}