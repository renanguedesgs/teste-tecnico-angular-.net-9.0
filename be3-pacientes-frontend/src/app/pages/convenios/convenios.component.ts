import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClipboardDocumentList, heroUsers } from '@ng-icons/heroicons/outline';
import { Convenio } from '../../interfaces/convenio.interface';


@Component({
  selector: 'app-convenios',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroClipboardDocumentList, heroUsers })],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Convênios</h1>
        <p class="text-sm text-gray-500 mt-1">Gerencie os convênios cadastrados no sistema</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (convenio of convenios(); track convenio.id) {
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ng-icon name="heroClipboardDocumentList" size="24" class="text-blue-600"></ng-icon>
              </div>
              @if (convenio.ativo) {
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Ativo
                </span>
              } @else {
                <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Inativo
                </span>
              }
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{convenio.nome}}</h3>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <ng-icon name="heroUsers" size="16"></ng-icon>
              <span>{{convenio.totalPacientes}} pacientes</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class ConveniosComponent {
  convenios = signal<Convenio[]>([
    { id: 1, nome: 'Unimed', totalPacientes: 95, ativo: true },
    { id: 2, nome: 'Bradesco Saúde', totalPacientes: 62, ativo: true },
    { id: 3, nome: 'SulAmérica', totalPacientes: 48, ativo: true },
    { id: 4, nome: 'Amil', totalPacientes: 30, ativo: true },
    { id: 5, nome: 'NotreDame Intermédica', totalPacientes: 12, ativo: true },
    { id: 6, nome: 'Prevent Senior', totalPacientes: 0, ativo: true }
  ]);
}