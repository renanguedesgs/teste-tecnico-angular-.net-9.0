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

// Configuração de CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p => p
        .WithOrigins("http://localhost:4200", "http://127.0.0.1:4200", "http://localhost:4200/api")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

var app = builder.Build();

// Executa migrations automaticamente
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PacientesDbContext>();
    db.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

// CORS deve vir antes dos controllers
app.UseCors("frontend");

app.UseAuthorization();
app.MapControllers();
app.Run();
