using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Application.Services;
using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Repositories;
using Moq;
using Xunit;

namespace Be3.Pacientes.Tests.Services
{
    public class ConvenioServiceTests
    {
        private readonly Mock<IConvenioRepository> _convenioRepoMock;
        private readonly ConvenioService _service;

        public ConvenioServiceTests()
        {
            _convenioRepoMock = new Mock<IConvenioRepository>();
            _service = new ConvenioService(_convenioRepoMock.Object);
        }

        [Fact]
        public async Task CadastrarAsync_DeveLancarErro_QuandoNomeVazio()
        {
            var dto = new ConvenioCreateUpdateDto { Nome = "" };

            var ex = await Assert.ThrowsAsync<ArgumentException>(() => _service.CadastrarAsync(dto));
            Assert.Equal("Nome do convênio é obrigatório.", ex.Message);
        }

        [Fact]
        public async Task CadastrarAsync_DeveAceitarNomeValido()
        {
            var dto = new ConvenioCreateUpdateDto { Nome = "Unimed" };

            // Mock para simular inserção
            _convenioRepoMock.Setup(r => r.AddAsync(It.IsAny<Convenio>()))
                             .Returns(Task.CompletedTask);

            var id = await _service.CadastrarAsync(dto);

            Assert.True(id >= 0);
            _convenioRepoMock.Verify(r => r.AddAsync(It.IsAny<Convenio>()), Times.Once);
        }
    }
}
