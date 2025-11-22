using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Be3.Pacientes.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusAtualizadoEmConvenios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 1,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 45, 36, 834, DateTimeKind.Utc).AddTicks(9916));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 2,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 45, 36, 834, DateTimeKind.Utc).AddTicks(9919));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 3,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 45, 36, 834, DateTimeKind.Utc).AddTicks(9920));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 4,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 45, 36, 834, DateTimeKind.Utc).AddTicks(9921));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 5,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 45, 36, 834, DateTimeKind.Utc).AddTicks(9922));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 1,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3304));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 2,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3306));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 3,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3306));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 4,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3307));

            migrationBuilder.UpdateData(
                table: "Convenios",
                keyColumn: "Id",
                keyValue: 5,
                column: "CriadoEm",
                value: new DateTime(2025, 11, 22, 1, 31, 2, 666, DateTimeKind.Utc).AddTicks(3308));
        }
    }
}
