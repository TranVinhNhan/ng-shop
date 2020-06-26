using Microsoft.EntityFrameworkCore.Migrations;

namespace ng_shop_api.Migrations
{
    public partial class ImageIsThumbnail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMainImage",
                table: "Images");

            migrationBuilder.AddColumn<bool>(
                name: "IsThumbnail",
                table: "Images",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsThumbnail",
                table: "Images");

            migrationBuilder.AddColumn<bool>(
                name: "IsMainImage",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
