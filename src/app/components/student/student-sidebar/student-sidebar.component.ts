import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent {
   @Output() toggleSidebar = new EventEmitter<boolean>();
    isCollapsed = true;
  
    constructor(private router: Router, private authService: AuthService) {
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

    logout(){
      this.authService.logout();
    }
}
