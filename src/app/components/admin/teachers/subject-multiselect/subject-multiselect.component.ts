// subject-multiselect.component.ts
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-subject-multiselect',
  template: `
    <div class="multiselect-container" [class.focused]="dropDownisOpen" (click)="$event.stopPropagation()">
      <div class="selected-items" (click)="openDropdown($event)">
        <div class="selected-badges">
          <span class="badge" *ngFor="let item of selectedItems">
            {{ item }}
            <button class="remove-badge" (click)="removeItem(item, $event)">×</button>
          </span>
        </div>
        <input
          #searchInput
          type="text"
          [placeholder]="selectedItems.length ? '' : 'Select subjects...'"
          [(ngModel)]="searchText"
          (input)="filterItems()"
          (click)="$event.stopPropagation()"
        >
        <button class="toggle-btn" (click)="toggleDropdown($event)">
          <i class="fas" [class.fa-chevron-down]="!dropDownisOpen" [class.fa-chevron-up]="dropDownisOpen"></i>
        </button>
      </div>
      
      <div class="dropdown-menu" *ngIf="dropDownisOpen">
        <div class="no-results" *ngIf="filteredItems.length === 0">
          No subjects found
        </div>
        <div class="dropdown-item" 
             *ngFor="let item of filteredItems"
             (click)="toggleSelection(item, $event)"
             [class.selected]="isSelected(item)">
          <i class="fas fa-check" *ngIf="isSelected(item)"></i>
          {{ item }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./subject-multiselect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubjectMultiselectComponent),
      multi: true
    }
  ]
})
export class SubjectMultiselectComponent implements ControlValueAccessor {
  @Input() items: string[] = [];
  
  selectedItems: string[] = [];
  filteredItems: string[] = [];
  searchText = '';
  dropDownisOpen = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  ngOnInit() {
    this.filteredItems = [...this.items];
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropDownisOpen = !this.dropDownisOpen;
    if (!this.dropDownisOpen) {
      this.resetSearch();
    }
  }

  openDropdown(event: Event) {
    event.stopPropagation();
    this.dropDownisOpen = true;
  }

  closeDropdown() {
    this.dropDownisOpen = false;
    this.resetSearch();
  }

  resetSearch() {
    this.searchText = '';
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleSelection(item: string, event: Event) {
    event.stopPropagation();
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    this.onChange(this.selectedItems);
    this.onTouched();
  }

  removeItem(item: string, event: Event) {
    event.stopPropagation();
    this.selectedItems = this.selectedItems.filter(i => i !== item);
    this.onChange(this.selectedItems);
    this.onTouched();
  }

  isSelected(item: string): boolean {
    return this.selectedItems.includes(item);
  }

  // ControlValueAccessor methods
  writeValue(value: string[]): void {
    this.selectedItems = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
