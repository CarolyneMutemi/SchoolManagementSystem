import { Component, OnInit } from '@angular/core';

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateJoined: Date;
  lastLogin: Date;
  profileImage?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  permissions: string[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditing = false;
  showPasswordModal = false;
  adminData: AdminProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.com',
    phoneNumber: '+1234567890',
    role: 'Super Admin',
    dateJoined: new Date('2023-01-15'),
    lastLogin: new Date('2024-02-22'),
    address: {
      street: '123 School Street',
      city: 'Education City',
      state: 'Learning State',
      zipCode: '12345'
    },
    permissions: [
      'Student Management',
      'Staff Management',
      'Financial Management',
      'System Settings',
      'Reports Access'
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // Implement save logic here
    this.isEditing = false;
  }

  togglePasswordModal(): void {
    this.showPasswordModal = !this.showPasswordModal;
  }

  changePassword(oldPassword: string, newPassword: string): void {
    // Implement password change logic here
    this.showPasswordModal = false;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
