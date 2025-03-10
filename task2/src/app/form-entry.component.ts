// task2/src/app/form-entry.component.ts




import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormService, FormEntry } from './form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-entry',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <h2>Enter Your Details</h2>
      
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" formControlName="status" class="form-control" (change)="updateValidators()">
          <option value="Completed">Completed</option>
          <option value="In Process">In Process</option>
          <option value="Not Yet Started">Not Yet Started</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" formControlName="name" type="text" class="form-control" />
        <div *ngIf="form.get('name')?.errors?.['required'] && form.get('name')?.touched" class="error-message">
          Name is required
        </div>
      </div>
      
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input id="dob" formControlName="dob" type="date" class="form-control" />
      </div>

      <div class="form-group">
        <label for="bloodGroup">Blood Group</label>
        <select id="bloodGroup" formControlName="bloodGroup" class="form-control">
          <option *ngFor="let bloodType of bloodTypes" [value]="bloodType">{{ bloodType }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input id="address" formControlName="address" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input id="phoneNumber" formControlName="phoneNumber" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="schoolName">School Name</label>
        <input id="schoolName" formControlName="schoolName" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="schoolGPA">School GPA</label>
        <input id="schoolGPA" formControlName="schoolGPA" type="number" class="form-control" />
      </div>

      <div class="form-group">
        <label for="schoolYOP">School Year of Passing</label>
        <select id="schoolYOP" formControlName="schoolYOP" class="form-control">
          <option *ngFor="let year of years" [value]="year">{{ year }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="interName">Intermediate College Name</label>
        <input id="interName" formControlName="interName" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="interGPA">Intermediate GPA</label>
        <input id="interGPA" formControlName="interGPA" type="number" class="form-control" />
      </div>

      <div class="form-group">
        <label for="interYOP">Intermediate Year of Passing</label>
        <select id="interYOP" formControlName="interYOP" class="form-control">
          <option *ngFor="let year of years" [value]="year">{{ year }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="btechName">BTech College Name</label>
        <input id="btechName" formControlName="btechName" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="btechGPA">BTech GPA</label>
        <input id="btechGPA" formControlName="btechGPA" type="number" class="form-control" />
      </div>

      <div class="form-group">
        <label for="btechYOP">BTech Year of Passing</label>
        <select id="btechYOP" formControlName="btechYOP" class="form-control">
          <option *ngFor="let year of years" [value]="year">{{ year }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="branch">Branch in College</label>
        <select id="branch" formControlName="branch" class="form-control">
          <option *ngFor="let branch of branches" [value]="branch">{{ branch }}</option>
        </select>
      </div>

      <!-- Skills Dropdown and Text Field -->
      <div class="form-group">
        <label for="skills">Skills</label>
        <select id="skillsDropdown" (change)="addSkill($event)" class="form-control">
          <option value="">Select a skill</option>
          <option *ngFor="let skill of skills" [value]="skill">{{ skill }}</option>
        </select>
        <input id="skills" formControlName="skills" type="text" readonly class="form-control" />
      </div>

      <button type="submit" [disabled]="!canSubmit()" class="submit-button">Submit</button>
    </form>
  `,
  styles: [
    `
      .form-container {
        max-width: 800px; 
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        color: white;
        background-color: rgb(11, 15, 74);
      }
      .form-group {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: white;
      }
      .form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: black;
        box-sizing: border-box; 
      }
      .submit-button {
        padding: 10px 20px;
        background-color: rgb(236, 141, 33);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%; 
      }
      .submit-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      .error-message {
        color: #ff6b6b;
        font-size: 12px;
        margin-top: 5px;
      }
    `,
  ],
})
export class FormEntryComponent {
  form: FormGroup;

  bloodTypes: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  skills: string[] = [
    'NLP',
    'Machine Learning',
    'Deep Learning',
    'Web Development',
    'App Development',
    'Game Development',
    'UI/UX Designing',
    'Graphic Designing',
    'React',
    'Angular',
    'Vue',
    'Node.js',
    'Express.js',
    'Django',
    'Flask',
    'Spring Boot',
    'Java',
    'C++',
    'Python',
    'JavaScript',
    'TypeScript',
    'Computer Vision',
  ];

  branches: string[] = [
    'CSE',
    'CSE AIML',
    'CSE IoT',
    'CSE Data Science',
    'IT',
    'ECE',
    'EEE',
    'Mech',
    'Civil',
  ];

  years: number[] = this.generateYears(2000, new Date().getFullYear());

  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.form = this.fb.group({
      name: ['', Validators.required], //Name is always required
      dob: [''],
      bloodGroup: [''],
      address: [''],
      phoneNumber: [''],
      schoolName: [''],
      schoolGPA: [''],
      schoolYOP: [''],
      interName: [''],
      interGPA: [''],
      interYOP: [''],
      btechName: [''],
      btechGPA: [''],
      btechYOP: [''],
      branch: [''],
      skills: [''],
      status: ['Completed', Validators.required], 
    });

    this.updateValidators();
  }

  generateYears(startYear: number, endYear: number): number[] {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

  updateValidators() {
    const status = this.form.get('status')?.value;
    const formControls = this.form.controls;
    
    Object.keys(formControls).forEach(key => {
      if (key !== 'name' && key !== 'status') {
        this.form.get(key)?.clearValidators();
        this.form.get(key)?.updateValueAndValidity();
      }
    });

    if (status === 'Completed') {
      Object.keys(formControls).forEach(key => {
        if (key !== 'name' && key !== 'status') {
          this.form.get(key)?.setValidators(Validators.required);
          this.form.get(key)?.updateValueAndValidity();
        }
      });
    }
  }

  addSkill(event: Event) {
    const selectedSkill = (event.target as HTMLSelectElement).value;
    if (selectedSkill && !this.selectedSkills.includes(selectedSkill)) {
      this.selectedSkills.push(selectedSkill);
      this.form.patchValue({ skills: this.selectedSkills.join(', ') });
    }
  }

  canSubmit(): boolean {
    const status = this.form.get('status')?.value;
    
    if (!this.form.get('name')?.valid) {
      return false;
    }
    
    if (status === 'Completed') {
      return this.form.valid;
    }
    
    return true;
  }

  onSubmit() {
    if (this.canSubmit()) {
      const formValues = this.form.value;
      
      const entry: FormEntry = {
        name: formValues.name,
        dob: formValues.dob || '',
        bloodGroup: formValues.bloodGroup || '',
        address: formValues.address || '',
        phoneNumber: formValues.phoneNumber || '',
        skills: formValues.skills ? formValues.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        branch: formValues.branch || '',
        status: formValues.status,
        school: {
          name: formValues.schoolName || '',
          gpa: formValues.schoolGPA || 0,
          yop: formValues.schoolYOP || 0,
        },
        inter: {
          name: formValues.interName || '',
          gpa: formValues.interGPA || 0,
          yop: formValues.interYOP || 0,
        },
        btech: {
          name: formValues.btechName || '',
          gpa: formValues.btechGPA || 0,
          yop: formValues.btechYOP || 0,
        },
      };
      
      this.formService.addEntry(entry); 
      this.form.reset({
        status: 'Completed' 
      });
      this.selectedSkills = []; 
      this.updateValidators();
    }
  }
}

// This component handles a dynamic form where fields change based on the selected status.
// It uses Angular's Reactive Forms to enforce validation and manage form state.
// The form includes fields like Name, Date of Birth, Address, and Skills.
// A dropdown allows users to select their skills, which are added dynamically.
// Validation rules update when the status changes (e.g., requiring additional fields).
// The form submission triggers a service call to save the data.
// Errors are displayed when a required field is left empty and touched.
// The component follows a modular, standalone approach using Angular's latest features.
