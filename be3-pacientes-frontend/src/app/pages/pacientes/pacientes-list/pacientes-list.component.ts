import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroPlus,
  heroPencil,
  heroTrash,
  heroMagnifyingGlass,
  heroFunnel,
  heroEye
} from '@ng-icons/heroicons/outline';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../interfaces/paciente.interface';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIconComponent,
  ],
  viewProviders: [
    provideIcons({
      heroPlus,
      heroPencil,
      heroTrash,
      heroMagnifyingGlass,
      heroFunnel,
      heroEye
    }),
    provideNgxMask()
  ],
  template: `
    <div class="space-y-6">

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p class="text-sm text-gray-500 mt-1">Gerencie os pacientes cadastrados no sistema</p>
        </div>
        <button
          (click)="navigateToNew()"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <ng-icon name="heroPlus" size="20"></ng-icon>
          Novo Paciente
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div class="md:col-span-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ng-icon name="heroMagnifyingGlass" size="20" class="text-gray-400"></ng-icon>
              </div>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (ngModelChange)="onSearchChange()"
                placeholder="Buscar por nome, CPF ou email..."
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <select
              [(ngModel)]="statusFilter"
              (ngModelChange)="onFilterChange()"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Total de Pacientes</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{totalPacientes()}}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Pacientes Ativos</p>
              <p class="text-2xl font-bold text-green-600 mt-1">{{pacientesAtivos()}}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 font-medium">Pacientes Inativos</p>
              <p class="text-2xl font-bold text-red-600 mt-1">{{pacientesInativos()}}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">⛔</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Convênio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              @if (filteredPacientes().length === 0) {
                <tr>
                  <td colspan="6" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center justify-center">
                      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ng-icon name="heroMagnifyingGlass" size="32" class="text-gray-400"></ng-icon>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-1">Nenhum paciente encontrado</h3>
                      <p class="text-sm text-gray-500">Tente ajustar os filtros ou adicione um novo paciente</p>
                    </div>
                  </td>
                </tr>
              } @else {
                @for (paciente of filteredPacientes(); track paciente.id) {
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {{getInitials(paciente.nome, paciente.sobrenome)}}
                        </div>
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900">
                            {{paciente.nome}} {{paciente.sobrenome}}
                          </p>
                          <p class="text-sm text-gray-500">{{formatDate(paciente.dataNascimento)}}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-900">
                        {{paciente.cpf || 'Não informado'}}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm">
                        <p class="text-gray-900">{{paciente.celular}}</p>
                        <p class="text-gray-500">{{paciente.email}}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-sm text-gray-900">{{paciente.convenio}}</span>
                    </td>
                    <td class="px-6 py-4">
                      @if (paciente.ativo) {
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ativo
                        </span>
                      } @else {
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inativo
                        </span>
                      }
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button
                          (click)="viewPaciente(paciente.id)"
                          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <ng-icon name="heroEye" size="18"></ng-icon>
                        </button>
                        <button
                          (click)="editPaciente(paciente.id)"
                          class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <ng-icon name="heroPencil" size="18"></ng-icon>
                        </button>
                        <button
                          (click)="toggleStatus(paciente)"
                          [class]="paciente.ativo ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
                          class="p-2 rounded-lg transition-colors"
                          [title]="paciente.ativo ? 'Desativar' : 'Ativar'"
                        >
                          <ng-icon name="heroTrash" size="18"></ng-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class PacientesListComponent implements OnInit {
pacienteService= inject(PacienteService);
  private router = inject(Router);

  searchTerm = signal('');
  statusFilter = signal('todos');
  
  pacientes = signal<Paciente[]>([]);

    ngOnInit() {
       this.loadPacienteFromService()
    }

      loadPacienteFromService() {
    this.pacienteService.findAll().subscribe({
      next: (data) => this.pacientes.set(data),
        error: (err) => {
            console.error('Erro ao carregar paciente:', err);
        }
    });
    }

  filteredPacientes = computed(() => {
    let result = this.pacientes();

    if (this.statusFilter() !== 'todos') {
      const isAtivo = this.statusFilter() === 'ativo';
      result = result.filter(p => p.ativo === isAtivo);
    }

    const search = this.searchTerm().toLowerCase();
    if (search) {
      result = result.filter(p =>
        p.nome.toLowerCase().includes(search) ||
        p.sobrenome.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search) ||
        (p.cpf && p.cpf.includes(search))
      );
    }

    return result;
  });

  totalPacientes = computed(() => this.pacientes().length);
  pacientesAtivos = computed(() => this.pacientes().filter(p => p.ativo).length);
  pacientesInativos = computed(() => this.pacientes().filter(p => !p.ativo).length);


  onSearchChange() {

  }

  onFilterChange() {

  }

  navigateToNew() {
    this.router.navigate(['/pacientes/novo']);
  }

  viewPaciente(id: number) {
    this.router.navigate(['/pacientes', id]);
  }

  editPaciente(id: number) {
    this.router.navigate(['/pacientes', id, 'editar']);
  }

  toggleStatus(paciente: Paciente) {
    const action = paciente.ativo ? 'desativar' : 'ativar';
    const confirmMsg = `Tem certeza que deseja ${action} o paciente ${paciente.nome} ${paciente.sobrenome}?`;
    
    if (confirm(confirmMsg)) {
      this.pacientes.update(pacientes =>
        pacientes.map(p =>
          p.id === paciente.id ? { ...p, ativo: !p.ativo } : p
        )
      );
    }
  }

  getInitials(nome: string, sobrenome: string): string {
    return `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase();
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}