using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Be3.Pacientes.Infrastructure.Repositories;
public class PacienteRepository : IPacienteRepository
{
    private readonly PacientesDbContext _ctx;
    public PacienteRepository(PacientesDbContext ctx) => _ctx = ctx;

    public Task<Paciente?> GetByIdAsync(int id) =>
      _ctx.Pacientes.Include(p => p.Convenio).FirstOrDefaultAsync(p => p.Id == id);

    public Task<bool> ExistsCpfAsync(string cpf, int? ignoreId = null) =>
      _ctx.Pacientes.AnyAsync(p => p.CPF == cpf && (ignoreId == null || p.Id != ignoreId));

    public Task<List<Paciente>> ListAsync(bool incluirInativos = false) =>
      _ctx.Pacientes.Include(p => p.Convenio)
        .Where(p => incluirInativos || p.Status == Status.Ativo)
        .OrderBy(p => p.Nome).ThenBy(p => p.Sobrenome).ToListAsync();

    public async Task AddAsync(Paciente paciente)
    {
        _ctx.Pacientes.Add(paciente);
        await _ctx.SaveChangesAsync();
    }
    public async Task UpdateAsync(Paciente paciente)
    {
        _ctx.Pacientes.Update(paciente);
        await _ctx.SaveChangesAsync();
    }
}