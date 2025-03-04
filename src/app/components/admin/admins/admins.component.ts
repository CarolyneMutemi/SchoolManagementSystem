// admin.component.ts
import { Component, OnInit } from '@angular/core';

import { Admin } from 'src/app/interfaces/admin';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  admins: Admin[] = [];
  showModal = false;
  isEditing = false;
  newAdmin: Admin = {
    _id: '',
    national_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: '',
    enrollment_date: ''
  };
  currentAdmin: Admin = this.newAdmin;

  constructor() {
    // Sample data - replace with actual API call
    this.admins = [
      {
        national_id: 12345678,
        first_name: "John",
        last_name: "Doe",
        email: "john@school.com",
        phone_number: "1234567890",
        enrollment_date: "2021-01-01",
        role: "Principal"
      },
      {
        national_id: 87654321,
        first_name: "Jane",
        last_name: "Doe",
        email: "jane@school.com",
        phone_number: "0987654321",
        enrollment_date: "2021-01-01",
        role: "Vice Principal"
      }
    ];
  }

  ngOnInit(): void {}

  openAddModal(): void {
    this.isEditing = false;
    this.currentAdmin = {...this.newAdmin};
    this.showModal = true;
  }

  openEditModal(admin: Admin): void {
    this.isEditing = true;
    this.currentAdmin = {...admin};
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentAdmin = {...this.newAdmin};
  }

  saveAdmin(admin: Admin): void {
    if (this.isEditing) {
      const index = this.admins.findIndex(a => a._id === admin._id);
      if (index !== -1) {
        this.admins[index] = admin;
      }
    } else {
      this.admins.push(admin);
    }
    this.closeModal();
  }

  deleteAdmin(id: string): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.admins = this.admins.filter(admin => admin._id !== id);
    }
  }
}
