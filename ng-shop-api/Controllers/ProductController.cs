using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ng_shop_api.Data;
using ng_shop_api.Models;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        public LaptopDbContext _context { get; }
        public ProductController(LaptopDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _context.Products.Include(p => p.Brand).ToListAsync();
            return Ok(products);
        }
    }
}