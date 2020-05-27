using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Models;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        public ProductController()
        {

        }

        [HttpGet]
        public Product GetProduct() => new Product()
        {
            ProductName = "Dell Precision 7540 i9-9980H RAM 32GB SSD 512GB FHD IPS T2000 (MỚI)",
            Description = "Test Description",
            Price = 47990000
        };
    }
}