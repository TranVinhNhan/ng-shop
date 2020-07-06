using System.ComponentModel.DataAnnotations.Schema;

namespace ng_shop_api.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public string ProductShortName { get; set; }
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(18,4)")]
        public decimal PricePerUnit { get; set; }
        
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ProductId {get; set;}
        public Product Product { get; set; }
    }
}