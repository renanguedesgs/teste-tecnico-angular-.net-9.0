using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Repositories;

namespace Be3.Pacientes.Application.Services;

public class ConvenioService
{
    private readonly IConvenioRepository _convenios;

    public ConvenioService(IConvenioRepository convenios)
    {
        _convenios = convenios;
    }

    public async Task<List<ConvenioDto>> ListarAsync()
    {
        var convenios = await _convenios.ListAtivosAsync();
        return convenios.Select(c => new ConvenioDto { Id = c.Id, Nome = c.Nome }).ToList();
    }

    public async Task<ConvenioDto?> ObterPorIdAsync(int id)
    {
        var convenio = await _convenios.GetByIdAsync(id);
        return convenio is null ? null : new ConvenioDto { Id = convenio.Id, Nome = convenio.Nome };
    }

    public async Task<int> CadastrarAsync(ConvenioCreateUpdateDto dto)
    {
        Validar(dto);

        var convenio = new Convenio
        {
            Nome = dto.Nome,
            CriadoEm = DateTime.UtcNow,
            Status = Status.Ativo
        };

        await _convenios.AddAsync(convenio);
        return convenio.Id;
    }

    public async Task AtualizarAsync(int id, ConvenioCreateUpdateDto dto)
    {
        var convenio = await _convenios.GetByIdAsync(id) ?? throw new KeyNotFoundException("Convênio não encontrado.");

        Validar(dto);

        convenio.Nome = dto.Nome;
        convenio.AtualizadoEm = DateTime.UtcNow;

        await _convenios.UpdateAsync(convenio);
    }

    public async Task InativarAsync(int id)
    {
        var convenio = await _convenios.GetByIdAsync(id) ?? throw new KeyNotFoundException("Convênio não encontrado.");
        convenio.Status = Status.Inativo;
        convenio.AtualizadoEm = DateTime.UtcNow;
        await _convenios.UpdateAsync(convenio);
    }

    private static void Validar(ConvenioCreateUpdateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome))
            throw new ArgumentException("Nome do convênio é obrigatório.");
    }
}
