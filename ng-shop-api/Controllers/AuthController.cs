using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Data;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LaptopDbContext _context;
        public AuthController(LaptopDbContext context)
        {
            _context = context;
        }
    }
}