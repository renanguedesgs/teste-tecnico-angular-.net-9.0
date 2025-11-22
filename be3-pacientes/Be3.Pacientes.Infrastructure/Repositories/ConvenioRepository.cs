using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Be3.Pacientes.Infrastructure.Repositories;

public class ConvenioRepository : IConvenioRepository
{
    private readonly PacientesDbContext _context;

    public ConvenioRepository(PacientesDbContext context)
    {
        _context = context;
    }

    public async Task<List<Convenio>> ListAtivosAsync() =>
        await _context.Convenios.Where(c => c.Status == Status.Ativo).ToListAsync();

    public async Task<Convenio?> GetByIdAsync(int id) =>
        await _context.Convenios.FindAsync(id);

    public async Task AddAsync(Convenio convenio)
    {
        _context.Convenios.Add(convenio);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Convenio convenio)
    {
        _context.Convenios.Update(convenio);
        await _context.SaveChangesAsync();
    }
}
