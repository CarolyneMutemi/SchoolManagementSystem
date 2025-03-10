import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  userRole: string = '';
  access_token: string | null = localStorage.getItem('access_token');
  
  
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      console.log("App component - User role: ", role);
      this.userRole = role;
    });

    if (this.authService.userAuthenticated()) {
      console.log("App component init.")
      this.authService.fetchUserProfile().subscribe();
    }
  }

  

  sidebarCollapsed = true;
  isMobile = window.innerWidth <= 768;

  // Listen for clicks on the main content
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Get the clicked element
    const target = event.target as HTMLElement;
    
    // Check if click is outside sidebar and not on toggle button
    if (!target.closest('.sidebar-container') && 
        !target.closest('.toggle-btn')) {
      if (this.sidebar && this.sidebar.toggleSidebar) {
        this.sidebar.isCollapsed = true;
        this.sidebar.toggleSidebar.emit(this.sidebar.isCollapsed);
      }
    }
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  isRoute(route: string) {
    return this.router.url === route;
  }
}
