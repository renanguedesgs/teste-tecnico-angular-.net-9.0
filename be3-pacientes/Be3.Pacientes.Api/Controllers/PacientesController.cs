using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Application.Services;
using Be3.Pacientes.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

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
        var retorno = pacientes.Select(p => new PacienteDetalhadoDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Sobrenome = p.Sobrenome,
            DataNascimento = p.DataNascimento,
            Idade = DateTime.Today.Year - p.DataNascimento.Year,
            Genero = p.Genero.ToString(),
            Cpf = p.CPF,
            Rg = p.RG,
            UfRg = p.UfRg.ToString(),
            Email = p.Email,
            Celular = p.Celular,
            TelefoneFixo = p.TelefoneFixo,
            Convenio = p.Convenio?.Nome ?? string.Empty,
            NumeroCarteirinha = p.NumeroCarteirinha,
            ValidadeCarteirinha = p.ValidadeCarteirinha,
            Ativo = p.Status == Status.Ativo,
            DataCadastro = p.CriadoEm,
            DataAtualizacao = p.AtualizadoEm
        });
        return Ok(retorno);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obter(int id)
    {
        var paciente = await _servico.ObterPorIdAsync(id);
        if (paciente is null)
            return NotFound(new { mensagem = "Paciente não encontrado." });

        var dto = new PacienteDetalhadoDto
        {
            Id = paciente.Id,
            Nome = paciente.Nome,
            Sobrenome = paciente.Sobrenome,
            DataNascimento = paciente.DataNascimento,
            Idade = DateTime.Today.Year - paciente.DataNascimento.Year,
            Genero = paciente.Genero.ToString(),
            Cpf = paciente.CPF,
            Rg = paciente.RG,
            UfRg = paciente.UfRg.ToString(),
            Email = paciente.Email,
            Celular = paciente.Celular,
            TelefoneFixo = paciente.TelefoneFixo,
            Convenio = paciente.Convenio?.Nome ?? string.Empty,
            NumeroCarteirinha = paciente.NumeroCarteirinha,
            ValidadeCarteirinha = paciente.ValidadeCarteirinha,
            Ativo = paciente.Status == Status.Ativo,
            DataCadastro = paciente.CriadoEm,
            DataAtualizacao = paciente.AtualizadoEm
        };

        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar([FromBody] PacienteCreateUpdateDto dto)
    {
        try
        {
            var id = await _servico.CadastrarAsync(dto);
            return CreatedAtAction(nameof(Obter), new { id }, new { id });
        }
        catch (ArgumentException ex) when (ex.Message.Contains("CPF já cadastrado"))
        {
            return Conflict(new { mensagem = ex.Message });
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
