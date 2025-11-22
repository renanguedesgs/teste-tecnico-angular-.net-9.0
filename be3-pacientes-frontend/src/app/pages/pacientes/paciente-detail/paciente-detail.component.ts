import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroPencil,
  heroTrash,
  heroPhone,
  heroEnvelope,
  heroIdentification,
  heroCalendar,
  heroUser,
  heroClipboardDocumentList
} from '@ng-icons/heroicons/outline';
import { PacienteDetalhado } from '../../../interfaces/paciente.interface';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-paciente-detail',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      heroArrowLeft,
      heroPencil,
      heroTrash,
      heroPhone,
      heroEnvelope,
      heroIdentification,
      heroCalendar,
      heroUser,
      heroClipboardDocumentList
    })
  ],
  template: `
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            (click)="goBack()"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Voltar"
          >
            <ng-icon name="heroArrowLeft" size="24" class="text-gray-600"></ng-icon>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Detalhes do Paciente</h1>
            <p class="text-sm text-gray-500 mt-1">Visualize todas as informações cadastradas</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            (click)="editPaciente()"
            class="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2.5 rounded-lg hover:bg-yellow-700 transition-colors shadow-sm font-medium"
          >
            <ng-icon name="heroPencil" size="18"></ng-icon>
            Editar
          </button>
          <button
            (click)="toggleStatus()"
            [class]="paciente()?.ativo ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
            class="flex items-center gap-2 text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm font-medium"
          >
            <ng-icon name="heroTrash" size="18"></ng-icon>
            {{paciente()?.ativo ? 'Desativar' : 'Ativar'}}
          </button>
        </div>
      </div>

      @if (paciente(); as p) {

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl shadow-lg">
                {{getInitials(p.nome, p.sobrenome)}}
              </div>
              <div class="flex-1 text-white">
                <h2 class="text-2xl font-bold">{{p.nome}} {{p.sobrenome}}</h2>
                <p class="text-blue-100 mt-1">{{p.idade}} anos • {{p.genero}}</p>
              </div>
              @if (p.ativo) {
                <span class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Ativo
                </span>
              } @else {
                <span class="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Inativo
                </span>
              }
            </div>
          </div>

          <div class="p-6 space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ng-icon name="heroUser" size="20" class="text-blue-600"></ng-icon>
                Dados Pessoais
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroCalendar" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Data de Nascimento</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{formatDate(p.dataNascimento)}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroUser" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Gênero</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.genero}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ng-icon name="heroIdentification" size="20" class="text-blue-600"></ng-icon>
                Documentos
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroIdentification" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">CPF</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.cpf || 'Não informado'}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroIdentification" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">RG</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.rg}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroIdentification" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">UF do RG</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.ufRg}}</p>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ng-icon name="heroPhone" size="20" class="text-blue-600"></ng-icon>
                Contato
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroEnvelope" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Email</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1 break-all">{{p.email}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroPhone" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Celular</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.celular}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <ng-icon name="heroPhone" size="20" class="text-gray-400 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Telefone Fixo</p>
                    <p class="text-sm text-gray-900 font-semibold mt-1">{{p.telefoneFixo || 'Não informado'}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ng-icon name="heroClipboardDocumentList" size="20" class="text-blue-600"></ng-icon>
                Convênio
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <ng-icon name="heroClipboardDocumentList" size="20" class="text-blue-600 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-blue-600 font-medium">Convênio</p>
                    <p class="text-sm text-blue-900 font-bold mt-1">{{p.convenio}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <ng-icon name="heroIdentification" size="20" class="text-blue-600 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-blue-600 font-medium">Nº Carteirinha</p>
                    <p class="text-sm text-blue-900 font-bold mt-1">{{p.numeroCarteirinha}}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <ng-icon name="heroCalendar" size="20" class="text-blue-600 mt-0.5"></ng-icon>
                  <div>
                    <p class="text-xs text-blue-600 font-medium">Validade</p>
                    <p class="text-sm text-blue-900 font-bold mt-1">{{formatMonthYear(p.validadeCarteirinha)}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <span class="font-medium">Cadastrado em:</span> {{formatDateTime(p.dataCadastro)}}
                </div>
                <div>
                  <span class="font-medium">Última atualização:</span> {{formatDateTime(p.dataAtualizacao)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``
})
export class PacienteDetailComponent implements OnInit {
  paciente = signal<PacienteDetalhado | null>(null);
  pacienteService= inject(PacienteService);


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadPacienteFromService(id);
  }


  loadPacienteFromService(id: string) {
    this.pacienteService.findById(id).subscribe({
      next: (data) => this.paciente.set(data),
        error: (err) => {
            console.error('Erro ao carregar paciente:', err);
        }
    });
    }

  getInitials(nome: string, sobrenome: string): string {
    return `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase();
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  formatMonthYear(date: string): string {
    const [year, month] = date.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]}/${year}`;
  }

  formatDateTime(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleString('pt-BR');
  }

  editPaciente() {
    this.router.navigate(['/pacientes', this.paciente()?.id, 'editar']);
  }

  toggleStatus() {
    const p = this.paciente();
    if (!p) return;

    const action = p.ativo ? 'desativar' : 'ativar';
    const confirmMsg = `Tem certeza que deseja ${action} o paciente ${p.nome} ${p.sobrenome}?`;
    
    if (confirm(confirmMsg)) {
      // Simular atualização
      this.paciente.set({ ...p, ativo: !p.ativo });
    }
  }

  goBack() {
    this.router.navigate(['/pacientes']);
  }
}
