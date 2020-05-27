using System.Collections;
using System.Collections.Generic;

namespace ng_shop_api.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        
        public ICollection<Product> Products { get; set; }
    }
}