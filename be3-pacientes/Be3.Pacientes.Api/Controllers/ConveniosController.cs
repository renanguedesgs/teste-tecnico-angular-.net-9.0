using Be3.Pacientes.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Be3.Pacientes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConveniosController : ControllerBase
{
    private readonly IConvenioRepository _repositorio;

    public ConveniosController(IConvenioRepository repositorio)
    {
        _repositorio = repositorio;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var convenios = await _repositorio.ListAtivosAsync();
        var retorno = convenios.Select(c => new { c.Id, c.Nome });
        return Ok(retorno);
    }
}