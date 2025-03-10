//entry-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormService, FormEntry, StatusType } from './form.service';
import { CommonModule } from '@angular/common';

// This component subscribes to formService to get the list of entries  
// It applies filtering logic based on selected statuses  
// The filtered results are displayed dynamically in the template  


@Component({
  selector: 'app-entry-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="entry-list">
      <div *ngIf="filteredEntries.length === 0" class="no-entries">
        No entries match the selected filters
      </div>
      <div *ngFor="let entry of filteredEntries" class="entry-card">
        <h3>{{ entry.name }}</h3>
        <p><strong>Status:</strong> {{ entry.status }}</p>
        <p><strong>DOB:</strong> {{ entry.dob }}</p>
        <p><strong>Blood Group:</strong> {{ entry.bloodGroup }}</p>
        <p><strong>Address:</strong> {{ entry.address }}</p>
        <p><strong>Phone Number:</strong> {{ entry.phoneNumber }}</p>
        <p><strong>School:</strong> {{ entry.school.name }} (GPA: {{ entry.school.gpa }}, YOP: {{ entry.school.yop }})</p>
        <p><strong>Intermediate:</strong> {{ entry.inter.name }} (GPA: {{ entry.inter.gpa }}, YOP: {{ entry.inter.yop }})</p>
        <p><strong>BTech:</strong> {{ entry.btech.name }} (GPA: {{ entry.btech.gpa }}, YOP: {{ entry.btech.yop }})</p>
        <p><strong>Branch:</strong> {{ entry.branch }}</p>
        <p><strong>Skills:</strong> {{ entry.skills.join(', ') }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .entry-list {
        display: grid;
        gap: 15px;
      }
      .entry-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .entry-card h3 {
        margin: 0 0 10px;
        font-size: 18px;
        color: #333;
      }
      .entry-card p {
        margin: 5px 0;
        color: #666;
      }
      .no-entries {
        padding: 20px;
        text-align: center;
        background-color: #f9f9f9;
        border: 1px dashed #ddd;
        border-radius: 8px;
        color: #666;
      }
    `,
  ],
})
export class EntryListComponent implements OnInit {
  filteredEntries: FormEntry[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.entries$.subscribe((entries) => {
      this.formService.filter$.subscribe((selectedStatuses) => {
        if (selectedStatuses.length === 0) {
          this.filteredEntries = entries;
        } else {
         this.filteredEntries = entries.filter((entry) => 
            selectedStatuses.includes(entry.status)
          );
        }
      });
    });
  }
}
