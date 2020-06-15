using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        public BrandController(ILaptopRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _repo.GetAllBrands();
            if (brands != null)
                return Ok(brands);
            return NotFound();
        }
    }
}