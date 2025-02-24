// sidebar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  isCollapsed = true;

  constructor(private router: Router) {
    // Collapse sidebar on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
        this.toggleSidebar.emit(true);
      }
    });
  }

  toggleSidebarState(event: Event) {
    event.stopPropagation(); // Prevent document click from immediately closing
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }
}