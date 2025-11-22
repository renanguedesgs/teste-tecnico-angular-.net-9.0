using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Be3.Pacientes.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "Convenios");

            migrationBuilder.AddColumn<DateTime>(
                name: "AtualizadoEm",
                table: "Convenios",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Convenios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AtualizadoEm", "CriadoEm", "Status" },
                values: new object[] { null, new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3304), 1 });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AtualizadoEm", "CriadoEm", "Status" },
                values: new object[] { null, new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3306), 1 });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AtualizadoEm", "CriadoEm", "Status" },
                values: new object[] { null, new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3306), 1 });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AtualizadoEm", "CriadoEm", "Status" },
                values: new object[] { null, new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3307), 1 });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AtualizadoEm", "CriadoEm", "Status" },
                values: new object[] { null, new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3308), 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AtualizadoEm",
                table: "Convenios");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Convenios");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "Convenios",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Ativo", "CriadoEm" },
                values: new object[] { true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3127) });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Ativo", "CriadoEm" },
                values: new object[] { true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3128) });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Ativo", "CriadoEm" },
                values: new object[] { true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3128) });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Ativo", "CriadoEm" },
                values: new object[] { true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3129) });

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Ativo", "CriadoEm" },
                values: new object[] { true, new DateTime(2025, 11, 21, 23, 50, 3, 783, DateTimeKind.Utc).AddTicks(3130) });
        }
    }
}
