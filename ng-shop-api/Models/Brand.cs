using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ng_shop_api.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        
        
        public Image Image { get; set; }
        public ICollection<Product> Products { get; set; }
        public Brand()
        {
            Products = new Collection<Product>();
        }

        public Brand(string brandName)
        {
            BrandName = brandName;
        }
    }
}