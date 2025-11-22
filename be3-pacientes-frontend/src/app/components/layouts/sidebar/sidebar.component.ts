// src/app/components/layout/sidebar/sidebar.component.ts
import { Component, input, output, OutputEmitterRef, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroUsers,
  heroClipboardDocumentList,
  heroChartBar,
  heroCog,
  heroXMark
} from '@ng-icons/heroicons/outline';
import { MenuItem } from '../../../interfaces/menu.interface';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIconComponent],
  viewProviders: [
    provideIcons({
      heroHome,
      heroUsers,
      heroClipboardDocumentList,
      heroChartBar,
      heroCog,
      heroXMark
    })
  ],
  template: `

    @if (isOpen()) {
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        (click)="handleOverlayClick()"
      ></div>
    }

    <aside
      [class]="sidebarClasses()"
    >

      <nav class="flex-1 p-4 overflow-y-auto">
        <ul class="space-y-1 mt-5">
          @for (item of menuItems(); track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-blue-50 text-blue-600 border-blue-500"
                [routerLinkActiveOptions]="{exact: item.route === '/dashboard'}"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-gray-50 text-gray-700 border-l-4 border-transparent"
                (click)="onMobileNavigate()"
              >
                <ng-icon [name]="item.icon" size="20"></ng-icon>
                <span class="font-medium">{{item.label}}</span>
                @if (item.badge) {
                  <span class="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {{item.badge}}
                  </span>
                }
              </a>
            </li>
          }
        </ul>

        <div class="my-6 border-t border-gray-200"></div>

      </nav>

    </aside>
  `,
  styles: ``
})
export class SidebarComponent {
  isOpen = input<boolean>(false);

  menuItems = signal<MenuItem[]>([
    { label: 'Pacientes', icon: 'heroUsers', route: '/pacientes', badge: 5 },
    { label: 'Convênios', icon: 'heroClipboardDocumentList', route: '/convenios' },
  ]);

  sidebarClasses() {
    return `
      fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50
      flex flex-col shadow-xl transition-transform duration-300 ease-in-out
      ${this.isOpen() ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:shadow-none
    `.trim();
  }

  closeSidebar: OutputEmitterRef<void> = output<void>();

  onMobileNavigate() {
    if (window.innerWidth < 1024) {
      this.closeSidebar.emit();
    }
  }
  
  handleOverlayClick() {
    console.log('Overlay clicked');
    this.closeSidebar.emit();
  }

}