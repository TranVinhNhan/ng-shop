using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace ng_shop_api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductShortName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Processor { get; set; }
        public string Memory { get; set; }
        public string Storage { get; set; }
        public string Display { get; set; }
        public string Graphics { get; set; }
        public string ChargingAndExpansion { get; set; }
        public string Size { get; set; }
        public string Weight { get; set; }
        public string OperatingSystem { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsDisplayed { get; set; }

        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public Product()
        {
            IsAvailable = IsDisplayed = true;
            Images = new Collection<Image>();
        }
    }
}