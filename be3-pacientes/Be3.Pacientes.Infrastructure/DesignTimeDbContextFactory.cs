using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Be3.Pacientes.Infrastructure.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<PacientesDbContext>
{
    public PacientesDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<PacientesDbContext>();
        optionsBuilder.UseSqlServer("Server=localhost;Database=Be3Pacientes;Trusted_Connection=True;TrustServerCertificate=True;");

        return new PacientesDbContext(optionsBuilder.Options);
    }
}
