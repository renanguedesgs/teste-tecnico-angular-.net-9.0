using System.ComponentModel.DataAnnotations;

namespace Be3.Pacientes.Application.DTOs;

public class ConvenioDto
{
    public int Id { get; init; }
    public string Nome { get; init; } = string.Empty;
}