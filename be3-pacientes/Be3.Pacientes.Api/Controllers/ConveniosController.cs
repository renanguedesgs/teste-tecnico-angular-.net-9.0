using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Application.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ConveniosController : ControllerBase
{
    private readonly ConvenioService _servico;

    public ConveniosController(ConvenioService servico)
    {
        _servico = servico;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var convenios = await _servico.ListarAsync();
        return Ok(convenios);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Obter(int id)
    {
        var convenio = await _servico.ObterPorIdAsync(id);
        if (convenio is null)
            return NotFound(new { mensagem = "Convênio não encontrado." });

        return Ok(convenio);
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar([FromBody] ConvenioCreateUpdateDto dto)
    {
        var id = await _servico.CadastrarAsync(dto);
        return CreatedAtAction(nameof(Obter), new { id }, new { id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] ConvenioCreateUpdateDto dto)
    {
        await _servico.AtualizarAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Inativar(int id)
    {
        await _servico.InativarAsync(id);
        return NoContent();
    }
}
