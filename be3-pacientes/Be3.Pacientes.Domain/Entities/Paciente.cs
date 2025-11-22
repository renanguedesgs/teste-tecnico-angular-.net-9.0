namespace Be3.Pacientes.Domain.Entities;
public class Paciente
{
    public int Id { get; set; }
    public string Nome { get; set; } = default!;
    public string Sobrenome { get; set; } = default!;
    public DateTime DataNascimento { get; set; }
    public Genero Genero { get; set; }
    public string? CPF { get; set; }
    public string RG { get; set; } = default!;
    public Uf UfRg { get; set; }
    public string Email { get; set; } = default!;
    public string? Celular { get; set; }
    public string? TelefoneFixo { get; set; }
    public int? ConvenioId { get; set; }
    public Convenio? Convenio { get; set; }
    public string? NumeroCarteirinha { get; set; }
    public string? ValidadeCarteirinha { get; set; }
    public Status Status { get; set; } = Status.Ativo;
    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    public DateTime? AtualizadoEm { get; set; }
}