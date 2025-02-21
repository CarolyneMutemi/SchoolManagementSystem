// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-subject-multiselect',
//   templateUrl: './subject-multiselect.component.html',
//   styleUrls: ['./subject-multiselect.component.css']
// })
// export class SubjectMultiselectComponent {

// }


// subject-multiselect.component.ts
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-subject-multiselect',
  templateUrl: './subject-multiselect.component.html',
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
  isOpen = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.filteredItems = [...this.items];
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    console.log("Is open: ", this.isOpen);
    if (!this.isOpen) {
      this.searchText = '';
      this.filterItems();
    }
  }

  openDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = true;
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleSelection(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
    this.onChange(this.selectedItems);
    this.onTouched();
  }

  removeItem(item: string, event: Event) {
    event.stopPropagation();
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.onChange(this.selectedItems);
      this.onTouched();
    }
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
