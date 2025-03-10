// status-filter.component.ts
import { Component } from '@angular/core';
import { FormService, StatusType } from './form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-container">
      <div class="filter-label">Filter by Status:</div>
      <div class="checkbox-filters">
        <label class="checkbox-label" *ngFor="let status of statusOptions">
          <input 
            type="checkbox" 
            [checked]="isStatusSelected(status)" 
            (change)="toggleStatus(status)"
          />
          {{ status }}
        </label>
      </div>
      <button class="clear-button" (click)="clearFilters()" 
              [disabled]="selectedStatuses.length === 0">
        Clear Filters
      </button>
      <button class="show-all-button" (click)="showAll()"
              [disabled]="selectedStatuses.length === statusOptions.length">
        Show All
      </button>
    </div>
  `,
  styles: [
    `
      .filter-container {
        margin: 20px 0;
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 5px;
        border: 1px solid #ddd;
      }
      .filter-label {
        margin-bottom: 10px;
        font-weight: bold;
      }
      .checkbox-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 10px;
      }
      .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
      .checkbox-label input {
        margin-right: 8px;
      }
      .clear-button, .show-all-button {
        margin-right: 10px;
        padding: 8px 15px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .clear-button:disabled, .show-all-button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    `,
  ],
})
export class StatusFilterComponent {
  statusOptions: StatusType[] = ['Completed', 'In Process', 'Not Yet Started'];
  selectedStatuses: StatusType[] = [];

  constructor(private formService: FormService) {}

  isStatusSelected(status: StatusType): boolean {
    return this.selectedStatuses.includes(status);
  }

  toggleStatus(status: StatusType) {
    if (this.selectedStatuses.includes(status)) {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);
    } else {
      this.selectedStatuses = [...this.selectedStatuses, status];
    }
    this.updateFilter();
  }

  clearFilters() {
    this.selectedStatuses = [];
    this.updateFilter();
  }

  showAll() {
    this.selectedStatuses = [...this.statusOptions];
    this.updateFilter();
  }

  private updateFilter() {
    this.formService.updateFilter(this.selectedStatuses);
  }
}