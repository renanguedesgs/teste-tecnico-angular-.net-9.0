public class PacienteDetalhadoDto
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Sobrenome { get; set; }
    public DateTime DataNascimento { get; set; }
    public int Idade { get; set; }
    public string Genero { get; set; }
    public string? Cpf { get; set; }
    public string Rg { get; set; }
    public string UfRg { get; set; }
    public string Email { get; set; }
    public string? Celular { get; set; }
    public string? TelefoneFixo { get; set; }
    public string Convenio { get; set; }
    public string NumeroCarteirinha { get; set; }
    public string ValidadeCarteirinha { get; set; }
    public bool Ativo { get; set; }
    public DateTime DataCadastro { get; set; }
    public DateTime? DataAtualizacao { get; set; }
}
