# 🏥 Cadastro de Pacientes — Angular + .NET 9.0 + SQL Server

Aplicação fullstack desenvolvida em **Angular** (frontend) e **.NET 9.0 / ASP.NET Core** (backend), com persistência em **SQL Server**.  
Projeto criado para desafio técnico de **cadastro e edição de pacientes**, com foco em qualidade de código, arquitetura em camadas, boas práticas e validações de regras de negócio.

---

## 🚀 Tecnologias

- **Frontend:** Angular 16+  
- **Backend:** ASP.NET Core 9.0  
- **Banco de Dados:** SQL Server  
- **ORM:** Entity Framework Core (com migrations)  
- **Documentação:** Swagger  
- **Infra:** Docker Compose (opcional)  

---

## 📋 Funcionalidades

- Cadastro e edição de pacientes  
- Listagem com filtros e paginação  
- Exclusão lógica (Ativo/Inativo)  
- Validações:
  - CPF único e válido (se informado)  
  - Email válido  
  - Pelo menos um telefone (celular ou fixo)  
  - Data de nascimento não pode ser futura  
  - Convênio obrigatório com carteirinha e validade  

---

## 🗄️ Banco de Dados

Scripts disponíveis em `/database/scripts`:

- `01_create_database.sql` → Criação da base  
- `02_create_tables.sql` → Tabelas Pacientes e Convênios  
- `03_seed_convenios.sql` → Mock de convênios (mínimo 5 registros)  

---

## 🔗 API RESTful

Principais rotas:

| Método | Rota                | Descrição                |
|--------|---------------------|--------------------------|
| GET    | /api/pacientes      | Lista pacientes          |
| GET    | /api/pacientes/{id} | Detalhe do paciente      |
| POST   | /api/pacientes      | Cadastra novo paciente   |
| PUT    | /api/pacientes/{id} | Atualiza paciente        |
| PATCH  | /api/pacientes/{id}/status | Ativa/Inativa paciente |
| GET    | /api/convenios      | Lista convênios ativos   |

Documentação completa disponível em **Swagger** (`/swagger`).

---

## 💻 Como executar

### Via Docker (recomendado)
```bash
docker compose up -d
```
---

## 🔗 Acessar a aplicação

Após subir os containers com Docker Compose, os serviços estarão disponíveis nos seguintes endereços:

- **Frontend:** [http://localhost:4200](http://localhost:4200)  
- **Backend:** [http://localhost:5000](http://localhost:5000)  
- **Swagger:** [http://localhost:5000/swagger](http://localhost:5000/swagger)  

> ⚠️ **Nota:** Certifique-se de que o Docker esteja em execução antes de acessar os serviços.

---

### 🐳 Docker
.dockerignore: evita que arquivos desnecessários sejam incluídos na imagem.

.env: centraliza variáveis de ambiente como conexões e portas.

docker-compose.yml: orquestra API, frontend e SQL Server.

Dockerfile: define o build da aplicação .NET 9 e Angular.









