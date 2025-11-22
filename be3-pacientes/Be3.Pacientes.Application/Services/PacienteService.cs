using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Repositories;

namespace Be3.Pacientes.Application.Services;

public class PacienteService
{
    private readonly IPacienteRepository _pacientes;
    private readonly IConvenioRepository _convenios;

    public PacienteService(IPacienteRepository pacientes, IConvenioRepository convenios)
    {
        _pacientes = pacientes;
        _convenios = convenios;
    }

    public Task<List<Paciente>> ListarAsync(bool incluirInativos = false) =>
        _pacientes.ListAsync(incluirInativos);

    public Task<Paciente?> ObterPorIdAsync(int id) =>
        _pacientes.GetByIdAsync(id);

    public async Task<int> CadastrarAsync(PacienteCreateUpdateDto dto)
    {
        Validar(dto);

        var cpf = NormalizarCpf(dto.CPF);
        if (!string.IsNullOrEmpty(cpf))
        {
            if (!CpfValido(cpf))
                throw new ArgumentException("CPF inválido.");
            if (await _pacientes.ExistsCpfAsync(cpf))
                throw new ArgumentException("CPF já cadastrado.");
        }

        if (dto.ConvenioId.HasValue && await _convenios.GetByIdAsync(dto.ConvenioId.Value) is null)
            throw new ArgumentException("Convênio inexistente.");

        var paciente = Mapear(dto);
        paciente.CPF = cpf;
        paciente.Status = Status.Ativo;
        paciente.CriadoEm = DateTime.UtcNow;

        await _pacientes.AddAsync(paciente);
        return paciente.Id;
    }


    public async Task AtualizarAsync(int id, PacienteCreateUpdateDto dto)
    {
        var paciente = await _pacientes.GetByIdAsync(id) ?? throw new KeyNotFoundException("Paciente não encontrado.");

        Validar(dto);

        var cpf = NormalizarCpf(dto.CPF);
        if (!string.IsNullOrEmpty(cpf))
        {
            if (!CpfValido(cpf)) throw new ArgumentException("CPF inválido.");
            if (await _pacientes.ExistsCpfAsync(cpf, ignoreId: id)) throw new ArgumentException("CPF já cadastrado.");
        }

        Aplicar(paciente, dto);
        paciente.CPF = cpf;
        paciente.AtualizadoEm = DateTime.UtcNow;

        await _pacientes.UpdateAsync(paciente);
    }

    public async Task InativarAsync(int id)
    {
        var paciente = await _pacientes.GetByIdAsync(id) ?? throw new KeyNotFoundException("Paciente não encontrado.");
        paciente.Status = Status.Inativo;
        paciente.AtualizadoEm = DateTime.UtcNow;
        await _pacientes.UpdateAsync(paciente);
    }

    private static string? NormalizarCpf(string? cpf) =>
        string.IsNullOrWhiteSpace(cpf) ? null : new string(cpf.Where(char.IsDigit).ToArray());

    private static bool CpfValido(string cpf)
    {
        if (cpf.Length != 11) return false;
        if (new string(cpf[0], 11) == cpf) return false;

        int[] multiplicador1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
        int[] multiplicador2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

        string tempCpf = cpf[..9];
        int soma = tempCpf.Select((c, i) => (c - '0') * multiplicador1[i]).Sum();
        int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        tempCpf += digito1.ToString();
        soma = tempCpf.Select((c, i) => (c - '0') * multiplicador2[i]).Sum();
        int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return cpf.EndsWith($"{digito1}{digito2}");
    }

    private static bool EmailValido(string email) =>
        System.Text.RegularExpressions.Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$");

    private static void Validar(PacienteCreateUpdateDto dto)
    {
        if (dto.DataNascimento.Date > DateTime.UtcNow.Date)
            throw new ArgumentException("Data de nascimento não pode ser futura.");

        if (!EmailValido(dto.Email))
            throw new ArgumentException("Email inválido.");

        var temContato = !string.IsNullOrWhiteSpace(dto.Celular) || !string.IsNullOrWhiteSpace(dto.TelefoneFixo);
        if (!temContato)
            throw new ArgumentException("Informe pelo menos Celular ou Telefone fixo.");

        if (!string.IsNullOrEmpty(dto.ValidadeCarteirinha) &&
            !System.Text.RegularExpressions.Regex.IsMatch(dto.ValidadeCarteirinha!, @"^(0[1-9]|1[0-2])\/\d{4}$"))
            throw new ArgumentException("Validade da carteirinha deve ser MM/AAAA.");
    }

    private static Paciente Mapear(PacienteCreateUpdateDto dto) => new()
    {
        Nome = dto.Nome,
        Sobrenome = dto.Sobrenome,
        DataNascimento = dto.DataNascimento,
        Genero = dto.Genero,
        RG = dto.RG,
        UfRg = dto.UfRg,
        Email = dto.Email,
        Celular = dto.Celular,
        TelefoneFixo = dto.TelefoneFixo,
        ConvenioId = dto.ConvenioId,
        NumeroCarteirinha = dto.NumeroCarteirinha,
        ValidadeCarteirinha = dto.ValidadeCarteirinha
    };

    private static void Aplicar(Paciente paciente, PacienteCreateUpdateDto dto)
    {
        paciente.Nome = dto.Nome;
        paciente.Sobrenome = dto.Sobrenome;
        paciente.DataNascimento = dto.DataNascimento;
        paciente.Genero = dto.Genero;
        paciente.RG = dto.RG;
        paciente.UfRg = dto.UfRg;
        paciente.Email = dto.Email;
        paciente.Celular = dto.Celular;
        paciente.TelefoneFixo = dto.TelefoneFixo;
        paciente.ConvenioId = dto.ConvenioId;
        paciente.NumeroCarteirinha = dto.NumeroCarteirinha;
        paciente.ValidadeCarteirinha = dto.ValidadeCarteirinha;
    }
}
