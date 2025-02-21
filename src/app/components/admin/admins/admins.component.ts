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
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  currentAdmin: Admin = this.newAdmin;

  constructor() {
    // Sample data - replace with actual API call
    this.admins = [
      {
        id: "12345678",
        firstName: "John",
        lastName: "Doe",
        email: "john@school.com",
        phoneNumber: "1234567890"
      },
      {
        id: "87654321",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@school.com",
        phoneNumber: "0987654321"
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
      const index = this.admins.findIndex(a => a.id === admin.id);
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
      this.admins = this.admins.filter(admin => admin.id !== id);
    }
  }
}
