import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent {
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
