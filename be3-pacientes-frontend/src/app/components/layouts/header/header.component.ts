import { Component, output, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars4, heroBell, heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroBars4, heroBell, heroUser })],
  template: `
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="flex items-center justify-between h-16 px-6">

        <div class="flex items-center gap-4">
          <button
            (click)="toggleSidebar.emit()"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <ng-icon name="heroBars4" size="24" class="text-gray-600"></ng-icon>
          </button>
          
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <div class="block sm:block">
              <h1 class="text-xl font-bold text-gray-800">MediCare</h1>
              <p class="text-xs text-gray-500">Sistema de Gestão de Pacientes</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
            <!--
          <button
            class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notificações"
          >
            <ng-icon name="heroBell" size="22" class="text-gray-600"></ng-icon>
            @if (notificationCount() > 0) {
              <span class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {{notificationCount()}}
              </span>
            }
          </button>
            -->
          <div class="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div class="hidden md:block text-right">
              <p class="text-sm font-medium text-gray-800">{{userName()}}</p>
              <p class="text-xs text-gray-500">{{userRole()}}</p>
            </div>
            <button
              class="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              aria-label="Perfil do usuário"
            >
              <ng-icon name="heroUser" size="20" class="text-white"></ng-icon>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {

  toggleSidebar = output<void>();

  notificationCount = signal(3);
  userName = signal('Guilherme Renan');
  userRole = signal('Desenvolvedor');
}