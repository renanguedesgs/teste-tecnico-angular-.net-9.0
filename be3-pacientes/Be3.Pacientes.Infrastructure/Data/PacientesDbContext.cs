using Be3.Pacientes.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Be3.Pacientes.Infrastructure.Data;

public class PacientesDbContext : DbContext
{
    public PacientesDbContext(DbContextOptions<PacientesDbContext> options) : base(options) { }
    public DbSet<Paciente> Pacientes => Set<Paciente>();
    public DbSet<Convenio> Convenios => Set<Convenio>();

    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<Paciente>()
          .HasIndex(p => p.CPF).IsUnique().HasFilter("[CPF] IS NOT NULL");

        model.Entity<Paciente>()
          .Property(p => p.Status)
          .HasConversion<int>();

        model.Entity<Paciente>()
          .Property(p => p.Genero)
          .HasConversion<int>();

        model.Entity<Paciente>()
          .Property(p => p.UfRg)
          .HasConversion<int>();

        model.Entity<Paciente>()
          .HasOne(p => p.Convenio)
          .WithMany()
          .HasForeignKey(p => p.ConvenioId);

        model.Entity<Convenio>().HasData(
          new Convenio { Id = 1, Nome = "Amil" },
          new Convenio { Id = 2, Nome = "Unimed" },
          new Convenio { Id = 3, Nome = "Bradesco Saúde" },
          new Convenio { Id = 4, Nome = "SulAmérica" },
          new Convenio { Id = 5, Nome = "NotreDame Intermédica" }
        );
    }
}
