using Be3.Pacientes.Domain.Entities;
namespace Be3.Pacientes.Infrastructure.Repositories;
public interface IPacienteRepository
{
    Task<Paciente?> GetByIdAsync(int id);
    Task<bool> ExistsCpfAsync(string cpf, int? ignoreId = null);
    Task<List<Paciente>> ListAsync(bool incluirInativos = false);
    Task AddAsync(Paciente paciente);
    Task UpdateAsync(Paciente paciente);
}