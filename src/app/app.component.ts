import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarComponent } from './components/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  constructor(private router: Router) {}

  sidebarCollapsed = true;
  isMobile = window.innerWidth <= 768;

  // Listen for clicks on the main content
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Get the clicked element
    const target = event.target as HTMLElement;
    console.log("Clicked", target);
    
    // Check if click is outside sidebar and not on toggle button
    if (!target.closest('.sidebar-container') && 
        !target.closest('.toggle-btn')) {
          console.log("Clicked outside sidebar");
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
    console.log("Route", route);
    console.log("Current Route", this.router.url);
    return this.router.url === route;
  }
}
