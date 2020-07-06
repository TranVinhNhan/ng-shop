using Microsoft.EntityFrameworkCore.Migrations;

namespace ng_shop_api.Migrations
{
    public partial class RenameOrderDetail0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "OrderDetails",
                newName: "PricePerUnit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PricePerUnit",
                table: "OrderDetails",
                newName: "Price");
        }
    }
}
