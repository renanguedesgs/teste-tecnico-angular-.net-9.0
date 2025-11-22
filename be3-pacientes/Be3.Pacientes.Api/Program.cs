using System.Text.Json.Serialization;
using Be3.Pacientes.Application.Services;
using Be3.Pacientes.Infrastructure.Data;
using Be3.Pacientes.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var conn = builder.Configuration.GetConnectionString("Default") ??
           "Server=localhost;Database=Be3Pacientes;User Id=sa;Password=Your_strong_P@ssw0rd;TrustServerCertificate=True;";

builder.Services.AddDbContext<PacientesDbContext>(o => o.UseSqlServer(conn));
builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
builder.Services.AddScoped<IConvenioRepository, ConvenioRepository>();
builder.Services.AddScoped<PacienteService>();
builder.Services.AddScoped<ConvenioService>();

builder.Services.AddControllers()
  .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p => p
        .WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PacientesDbContext>();
    db.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("frontend");
app.MapControllers();
app.Run();
