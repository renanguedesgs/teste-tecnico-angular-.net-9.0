export interface PacienteDetalhado {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  idade: number;
  genero: string;
  cpf?: string;
  rg: string;
  ufRg: string;
  email: string;
  celular: string;
  telefoneFixo?: string;
  convenio: string;
  numeroCarteirinha: string;
  validadeCarteirinha: string;
  ativo: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
}

export interface Paciente {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  genero: string;
  cpf?: string;
  email: string;
  celular: string;
  convenio: string;
  ativo: boolean;
}