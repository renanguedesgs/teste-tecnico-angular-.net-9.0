using System.ComponentModel.DataAnnotations;
using Be3.Pacientes.Domain.Entities;

namespace Be3.Pacientes.Application.DTOs;

public class PacienteCreateUpdateDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Nome { get; init; } = string.Empty;

    [Required(ErrorMessage = "O sobrenome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O sobrenome deve ter no máximo 100 caracteres.")]
    public string Sobrenome { get; init; } = string.Empty;

    [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
    [DataType(DataType.Date)]
    public DateTime DataNascimento { get; init; }

    [Required(ErrorMessage = "O gênero é obrigatório.")]
    public Genero Genero { get; init; }

    [RegularExpression(@"^\d{11}$", ErrorMessage = "CPF deve conter exatamente 11 dígitos numéricos.")]
    public string? CPF { get; init; }

    [Required(ErrorMessage = "O RG é obrigatório.")]
    [StringLength(20, ErrorMessage = "O RG deve ter no máximo 20 caracteres.")]
    public string RG { get; init; } = string.Empty;

    [Required(ErrorMessage = "A UF do RG é obrigatória.")]
    public Uf UfRg { get; init; }

    [Required(ErrorMessage = "O e-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    public string Email { get; init; } = string.Empty;

    [Phone(ErrorMessage = "Celular inválido.")]
    public string? Celular { get; init; }

    [Phone(ErrorMessage = "Telefone fixo inválido.")]
    public string? TelefoneFixo { get; init; }

    public int? ConvenioId { get; init; }

    [StringLength(50, ErrorMessage = "Número da carteirinha deve ter no máximo 50 caracteres.")]
    public string? NumeroCarteirinha { get; init; }

    [RegularExpression(@"^(0[1-9]|1[0-2])\/\d{4}$", ErrorMessage = "Validade deve estar no formato MM/AAAA.")]
    public string? ValidadeCarteirinha { get; init; }
}