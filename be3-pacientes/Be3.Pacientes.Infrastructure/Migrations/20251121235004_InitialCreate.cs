using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Be3.Pacientes.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Convenios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ativo = table.Column<bool>(type: "bit", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Convenios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pacientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sobrenome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Genero = table.Column<int>(type: "int", nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UfRg = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Celular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelefoneFixo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConvenioId = table.Column<int>(type: "int", nullable: true),
                    NumeroCarteirinha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidadeCarteirinha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AtualizadoEm = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pacientes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pacientes_Convenios_ConvenioId",
                        column: x => x.ConvenioId,
                        principalTable: "Convenios",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Convenios",
                columns: new[] { "Id", "Ativo", "CriadoEm", "Nome" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3127), "Amil" },
                    { 2, true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3128), "Unimed" },
                    { 3, true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3128), "Bradesco Saúde" },
                    { 4, true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3129), "SulAmérica" },
                    { 5, true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3130), "NotreDame Intermédica" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pacientes_ConvenioId",
                table: "Pacientes",
                column: "ConvenioId");

            migrationBuilder.CreateIndex(
                name: "IX_Pacientes_CPF",
                table: "Pacientes",
                column: "CPF",
                unique: true,
                filter: "[CPF] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pacientes");

            migrationBuilder.DropTable(
                name: "Convenios");
        }
    }
}
