﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ng_shop_api.Migrations
{
    public partial class RemoveSumOrderDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sum",
                table: "OrderDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Sum",
                table: "OrderDetails",
                type: "decimal(18,4)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
