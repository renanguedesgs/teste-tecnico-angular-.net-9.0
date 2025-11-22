using Be3.Pacientes.Domain.Entities;

namespace Be3.Pacientes.Infrastructure.Repositories;

public interface IConvenioRepository
{
    Task<List<Convenio>> ListAtivosAsync();
    Task<Convenio?> GetByIdAsync(int id);
    Task AddAsync(Convenio convenio);
    Task UpdateAsync(Convenio convenio);
}
