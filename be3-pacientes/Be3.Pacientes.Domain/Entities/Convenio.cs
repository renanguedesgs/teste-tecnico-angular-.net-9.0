namespace Be3.Pacientes.Domain.Entities;

public class Convenio
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;

    public Status Status { get; set; } = Status.Ativo;
    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    public DateTime? AtualizadoEm { get; set; }
}