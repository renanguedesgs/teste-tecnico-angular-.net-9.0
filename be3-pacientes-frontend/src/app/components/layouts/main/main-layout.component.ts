import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="flex flex-col h-screen bg-gray-50 overflow-hidden">
    <app-header (toggleSidebar)="toggleSidebar()"></app-header>
     

      <div class="flex-1 flex overflow-hidden">
 <app-sidebar 
        [isOpen]="sidebarOpen()" 
        (closeSidebar)="closeSidebar()">
      </app-sidebar>

        <main class="flex-1 overflow-y-auto bg-gray-50">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: ``
})
export class MainLayoutComponent {

  sidebarOpen = signal(false);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    if (event.target.innerWidth >= 1024) {
      this.sidebarOpen.set(false);
    }
  }

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}