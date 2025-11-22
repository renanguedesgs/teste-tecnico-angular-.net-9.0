using Be3.Pacientes.Application.DTOs;
using Be3.Pacientes.Application.Services;
using Be3.Pacientes.Domain.Entities;
using Be3.Pacientes.Infrastructure.Repositories;
using Moq;
using Xunit;

namespace Be3.Pacientes.Tests.Services
{
    public class PacienteServiceTests
    {
        private readonly Mock<IPacienteRepository> _pacienteRepoMock;
        private readonly Mock<IConvenioRepository> _convenioRepoMock;
        private readonly PacienteService _service;

        public PacienteServiceTests()
        {
            _pacienteRepoMock = new Mock<IPacienteRepository>();
            _convenioRepoMock = new Mock<IConvenioRepository>();
            _service = new PacienteService(_pacienteRepoMock.Object, _convenioRepoMock.Object);
        }

        [Fact]
        public async Task CadastrarAsync_DeveLancarErro_QuandoContatoNaoInformado()
        {
            var dto = new PacienteCreateUpdateDto
            {
                Nome = "João",
                Sobrenome = "Silva",
                DataNascimento = new DateTime(1990, 1, 1),
                Genero = Genero.Masculino,
                RG = "1234567",
                UfRg = Uf.SP,
                Email = "joao@email.com",
                Celular = null,
                TelefoneFixo = null
            };

            var ex = await Assert.ThrowsAsync<ArgumentException>(() => _service.CadastrarAsync(dto));
            Assert.Equal("Informe pelo menos Celular ou Telefone fixo.", ex.Message);
        }

        [Fact]
        public async Task CadastrarAsync_DeveLancarErro_QuandoDataNascimentoFutura()
        {
            var dto = new PacienteCreateUpdateDto
            {
                Nome = "Maria",
                Sobrenome = "Oliveira",
                DataNascimento = DateTime.UtcNow.AddDays(1),
                Genero = Genero.Feminino,
                RG = "9876543",
                UfRg = Uf.RJ,
                Email = "maria@email.com",
                Celular = "(21)91234-5678"
            };

            var ex = await Assert.ThrowsAsync<ArgumentException>(() => _service.CadastrarAsync(dto));
            Assert.Equal("Data de nascimento não pode ser futura.", ex.Message);
        }

        [Fact]
        public async Task CadastrarAsync_DeveAceitarEmailValido()
        {
            var dto = new PacienteCreateUpdateDto
            {
                Nome = "Carlos",
                Sobrenome = "Souza",
                DataNascimento = new DateTime(1985, 5, 20),
                Genero = Genero.Masculino,
                RG = "1234567",
                UfRg = Uf.SP,
                Email = "carlos.souza@email.com",
                Celular = "(11)91234-5678"
            };

            _pacienteRepoMock.Setup(r => r.ExistsCpfAsync(It.IsAny<string>(), null)).ReturnsAsync(false);

            var id = await _service.CadastrarAsync(dto);
            Assert.True(id >= 0);
        }
    }
}
