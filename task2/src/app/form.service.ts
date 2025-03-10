import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FormEntry {
  name: string;
  dob: string;
  bloodGroup: string;
  address: string;
  phoneNumber: string;
  school: { name: string; gpa: number; yop: number };
  inter: { name: string; gpa: number; yop: number };
  btech: { name: string; gpa: number; yop: number };
  branch: string;
  skills: string[];
  status: 'Completed' | 'In Process' | 'Not Yet Started';
}

export type StatusType = 'Completed' | 'In Process' | 'Not Yet Started';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private entriesSubject = new BehaviorSubject<FormEntry[]>([]);
  entries$ = this.entriesSubject.asObservable();

  private filterSubject = new BehaviorSubject<StatusType[]>([]);
  filter$ = this.filterSubject.asObservable();

  addEntry(entry: FormEntry) {
    const currentEntries = this.entriesSubject.value;
    this.entriesSubject.next([...currentEntries, entry]);
  }

  updateFilter(statuses: StatusType[]) {
    this.filterSubject.next(statuses);
  }
}

//Uses Angular's FormBuilder to create a reactive form with fields for personal details, education, and skills.
//updateValidators() dynamically sets required fields based on the selected status (e.g., "Completed" requires all fields).
//Allows multiple skill selection via dropdown.
//addSkill(event) updates an array (selectedSkills) and stores them as a comma-separated string.
//Ensures only required fields (based on status) are filled before submission.
//Prevents invalid data entry with conditional validation rules.