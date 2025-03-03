// sidebar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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
    console.log("Logging out user - in component.");
    this.authService.logout();
    console.log("User logged out");
  }
}