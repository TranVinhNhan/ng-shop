using System.ComponentModel.DataAnnotations.Schema;

namespace ng_shop_api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}