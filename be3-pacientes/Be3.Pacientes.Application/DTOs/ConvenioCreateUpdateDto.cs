using System.ComponentModel.DataAnnotations;

namespace Be3.Pacientes.Application.DTOs;

public class ConvenioCreateUpdateDto
{
    [Required(ErrorMessage = "O nome do convênio é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres.")]
    public string Nome { get; init; } = string.Empty;
}