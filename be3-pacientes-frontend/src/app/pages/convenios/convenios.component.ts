import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClipboardDocumentList, heroUsers } from '@ng-icons/heroicons/outline';
import { Convenio } from '../../interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';


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
export class ConveniosComponent implements OnInit{
  private convenioService = inject(ConvenioService);
  convenios = signal<Convenio[]>([]);

  ngOnInit(): void {
    this.loadConvenios();
  }
  loadConvenios(): void {
    this.convenioService.findAll().subscribe({
      next: (data) => {
        this.convenios.set(data);
      },
      error: (error) => {
        console.error('Erro ao carregar convênios:', error);
      }
    }); 
  }
}