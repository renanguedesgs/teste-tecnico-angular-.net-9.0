import { Component, OnInit, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroCheck, heroXMark } from '@ng-icons/heroicons/outline';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PacienteService } from '../../../services/paciente.service';

interface Convenio {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    NgxMaskDirective
  ],
  viewProviders: [
    provideIcons({ heroArrowLeft, heroCheck, heroXMark }),
    provideNgxMask()
  ],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">

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
            <h1 class="text-2xl font-bold text-gray-900">
              {{isEditMode() ? 'Editar Paciente' : 'Novo Paciente'}}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              {{isEditMode() ? 'Atualize as informações do paciente' : 'Preencha os dados do novo paciente'}}
            </p>
          </div>
        </div>
      </div>


      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">1</span>
            Dados Pessoais
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nome <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                formControlName="nome"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('nome')"
                placeholder="Digite o nome"
              />
              @if (isFieldInvalid('nome')) {
                <p class="text-red-500 text-xs mt-1">Nome é obrigatório</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Sobrenome <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                formControlName="sobrenome"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('sobrenome')"
                placeholder="Digite o sobrenome"
              />
              @if (isFieldInvalid('sobrenome')) {
                <p class="text-red-500 text-xs mt-1">Sobrenome é obrigatório</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                formControlName="dataNascimento"
                [max]="maxDate()"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('dataNascimento')"
              />
              @if (isFieldInvalid('dataNascimento')) {
                <p class="text-red-500 text-xs mt-1">
                  @if (form.get('dataNascimento')?.errors?.['required']) {
                    Data de nascimento é obrigatória
                  } @else if (form.get('dataNascimento')?.errors?.['futureDate']) {
                    Data não pode ser futura
                  }
                </p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Gênero <span class="text-red-500">*</span>
              </label>
              <select
                formControlName="genero"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('genero')"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              @if (isFieldInvalid('genero')) {
                <p class="text-red-500 text-xs mt-1">Gênero é obrigatório</p>
              }
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">2</span>
            Documentos
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text"
                formControlName="cpf"
                mask="000.000.000-00"
                [showMaskTyped]="true"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('cpf')"
                placeholder="000.000.000-00"
              />
              @if (isFieldInvalid('cpf')) {
                <p class="text-red-500 text-xs mt-1">CPF inválido</p>
              }
              @if (cpfDuplicado()) {
                <p class="text-red-500 text-xs mt-1">CPF já cadastrado no sistema</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                RG <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                formControlName="rg"
                mask="00.000.000-0"
                [showMaskTyped]="true"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('rg')"
                placeholder="00.000.000-0"
              />
              @if (isFieldInvalid('rg')) {
                <p class="text-red-500 text-xs mt-1">RG é obrigatório</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                UF do RG <span class="text-red-500">*</span>
              </label>
              <select
                formControlName="ufRg"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('ufRg')"
              >
                <option value="">Selecione</option>
                @for (uf of ufs(); track uf) {
                  <option [value]="uf">{{uf}}</option>
                }
              </select>
              @if (isFieldInvalid('ufRg')) {
                <p class="text-red-500 text-xs mt-1">UF é obrigatória</p>
              }
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">3</span>
            Contato
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                formControlName="email"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('email')"
                placeholder="exemplo@email.com"
              />
              @if (isFieldInvalid('email')) {
                <p class="text-red-500 text-xs mt-1">Email inválido</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Celular <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                formControlName="celular"
                mask="(00) 00000-0000"
                [showMaskTyped]="true"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('celular')"
                placeholder="(00) 00000-0000"
              />
              @if (isFieldInvalid('celular')) {
                <p class="text-red-500 text-xs mt-1">
                  @if (form.errors?.['phoneRequired']) {
                    Celular ou telefone fixo é obrigatório
                  } @else {
                    Celular inválido
                  }
                </p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Telefone Fixo
              </label>
              <input
                type="text"
                formControlName="telefoneFixo"
                mask="(00) 0000-0000"
                [showMaskTyped]="true"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('telefoneFixo')"
                placeholder="(00) 0000-0000"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">4</span>
            Convênio
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div class="md:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Convênio <span class="text-red-500">*</span>
              </label>
              <select
                formControlName="convenioId"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('convenioId')"
              >
                <option value="">Selecione um convênio</option>
                @for (convenio of convenios(); track convenio.id) {
                  <option [value]="convenio.id">{{convenio.nome}}</option>
                }
              </select>
              @if (isFieldInvalid('convenioId')) {
                <p class="text-red-500 text-xs mt-1">Convênio é obrigatório</p>
              }
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Número da Carteirinha <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                formControlName="numeroCarteirinha"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('numeroCarteirinha')"
                placeholder="Digite o número da carteirinha"
              />
              @if (isFieldInvalid('numeroCarteirinha')) {
                <p class="text-red-500 text-xs mt-1">Número da carteirinha é obrigatório</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Validade <span class="text-red-500">*</span>
              </label>
              <input
                type="month"
                formControlName="validadeCarteirinha"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                [class.border-red-500]="isFieldInvalid('validadeCarteirinha')"
              />
              @if (isFieldInvalid('validadeCarteirinha')) {
                <p class="text-red-500 text-xs mt-1">Validade é obrigatória</p>
              }
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <button
            type="button"
            (click)="goBack()"
            class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <span class="flex items-center gap-2">
              <ng-icon name="heroXMark" size="20"></ng-icon>
              Cancelar
            </span>
          </button>
          <button
            type="submit"
            [disabled]="isSubmitting()"
            class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="flex items-center gap-2">
              <ng-icon name="heroCheck" size="20"></ng-icon>
              {{isSubmitting() ? 'Salvando...' : (isEditMode() ? 'Atualizar' : 'Cadastrar')}}
            </span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class PacienteFormComponent implements OnInit {
    pacienteService= inject(PacienteService);
  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  cpfDuplicado = signal(false);
  pacienteId = signal<number | null>(null);

  ufs = signal([
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]);

  convenios = signal<Convenio[]>([
    { id: 1, nome: 'Unimed' },
    { id: 2, nome: 'Bradesco Saúde' },
    { id: 3, nome: 'SulAmérica' },
    { id: 4, nome: 'Amil' },
    { id: 5, nome: 'NotreDame Intermédica' },
    { id: 6, nome: 'Prevent Senior' }
  ]);

  maxDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'novo') {
      this.isEditMode.set(true);
      this.pacienteId.set(+id);
      this.loadPaciente(+id);
    }
  }

  initForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: ['', [Validators.required, this.futureDateValidator]],
      genero: ['', Validators.required],
      cpf: ['', this.cpfValidator],
      rg: ['', Validators.required],
      ufRg: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.minLength(15)]],
      telefoneFixo: [''],
      convenioId: ['', Validators.required],
      numeroCarteirinha: ['', Validators.required],
      validadeCarteirinha: ['', Validators.required]
    }, { validators: this.phoneValidator });

    this.form.get('cpf')?.valueChanges.subscribe(cpf => {
      if (cpf && cpf.length === 14) {
        this.checkCpfDuplicado(cpf);
      } else {
        this.cpfDuplicado.set(false);
      }
    });
  }

  loadPaciente(id: number) {
    const mockPaciente = {
      nome: 'João',
      sobrenome: 'Silva',
      dataNascimento: '1985-05-15',
      genero: 'Masculino',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      ufRg: 'SP',
      email: 'joao.silva@email.com',
      celular: '(11) 98765-4321',
      telefoneFixo: '(11) 3456-7890',
      convenioId: '1',
      numeroCarteirinha: '123456789',
      validadeCarteirinha: '2025-12'
    };

    this.form.patchValue(mockPaciente);
  }

  checkCpfDuplicado(cpf: string) {
    const cpfsExistentes = ['123.456.789-00', '987.654.321-00'];
    const isDuplicado = cpfsExistentes.includes(cpf) && 
                        (!this.isEditMode() || this.form.get('cpf')?.value !== cpf);
    this.cpfDuplicado.set(isDuplicado);
  }

  cpfValidator(control: any) {
    if (!control.value) return null;
    
    const cpf = control.value.replace(/\D/g, '');
    if (cpf.length !== 11) return { invalidCpf: true };
    
    if (/^(\d)\1{10}$/.test(cpf)) return { invalidCpf: true };
    
    return null;
  }

  futureDateValidator(control: any) {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    
    return null;
  }

  phoneValidator(group: FormGroup) {
    const celular = group.get('celular')?.value;
    const telefoneFixo = group.get('telefoneFixo')?.value;
    
    if (!celular && !telefoneFixo) {
      return { phoneRequired: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.form.invalid || this.cpfDuplicado()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      console.log('Dados do formulário:', this.form.value);
      this.isSubmitting.set(false);
      this.router.navigate(['/pacientes']);
    }, 1500);
  }

  goBack() {
    this.router.navigate(['/pacientes']);
  }
}