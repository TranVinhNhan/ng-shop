using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using ng_shop_api.Models;

namespace ng_shop_api.Data
{
    public class Seed
    {
        private readonly LaptopDbContext _context;
        public Seed(LaptopDbContext context)
        {
            _context = context;
        }

        public void SeedProduct()
        {
            if (!_context.Products.Any())
            {
                var productsData = System.IO.File.ReadAllText("Data/Product.json");
                var products = JsonConvert.DeserializeObject<List<Product>>(productsData);
                foreach (var product in products)
                {
                    _context.Products.Add(product);
                }
                _context.SaveChanges();
            }
        }
    }
}