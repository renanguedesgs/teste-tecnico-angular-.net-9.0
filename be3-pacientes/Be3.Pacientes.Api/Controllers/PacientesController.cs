using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Be3.Pacientes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacientesController : ControllerBase
{
    private readonly PacienteService _servico;

    public PacientesController(PacienteService servico)
    {
        _servico = servico;
    }

    [HttpGet]
    public async Task<IActionResult> Listar([FromQuery] bool incluirInativos = false)
    {
        var pacientes = await _servico.ListarAsync(incluirInativos);

        var retorno = pacientes.Select(p => new
        {
            p.Id,
            NomeCompleto = $"{p.Nome} {p.Sobrenome}",
            CPF = p.CPF ?? string.Empty,
            Email = p.Email,
            Contato = p.Celular ?? p.TelefoneFixo ?? string.Empty,
            Status = p.Status.ToString(),
            Convenio = p.Convenio?.Nome
        });

        return Ok(retorno);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obter(int id)
    {
        var paciente = await _servico.ObterPorIdAsync(id);
        if (paciente is null)
            return NotFound(new { mensagem = "Paciente não encontrado." });

        return Ok(paciente);
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar([FromBody] PacienteCreateUpdateDto dto)
    {
        try
        {
            var id = await _servico.CadastrarAsync(dto);
            return CreatedAtAction(nameof(Obter), new { id }, new { id });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] PacienteCreateUpdateDto dto)
    {
        try
        {
            await _servico.AtualizarAsync(id, dto);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { mensagem = "Paciente não encontrado." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Inativar(int id)
    {
        try
        {
            await _servico.InativarAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { mensagem = "Paciente não encontrado." });
        }
    }
}
