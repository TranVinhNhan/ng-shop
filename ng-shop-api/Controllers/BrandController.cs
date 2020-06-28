using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Dtos;
using ng_shop_api.Models;
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

        [HttpGet("{id}", Name = nameof(GetBrandById))]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var brand = await _repo.GetBrandById(id);
            if (brand != null)
                return Ok(brand);
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddBrand([FromBody]BrandForCreateDto brandForCreateDto)
        {
            var brand = new Brand(brandForCreateDto.BrandName);
            _repo.Add(brand);
            if (await _repo.SaveAll())
            {
                return CreatedAtRoute(nameof(GetBrandById), new { brand.Id }, brand);
            }
            return BadRequest("Could not add new brand");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(int id, [FromBody]BrandForUpdateDto brandForUpdateDto)
        {
            var brand = await _repo.GetBrandById(id);
            if (brand == null)
                return NotFound();

            brand.BrandName = brandForUpdateDto.BrandName;
            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating brand {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _repo.GetBrandById(id);
            if (brand == null)
                return NotFound();

            _repo.Delete(brand);
            if (await _repo.SaveAll())
                return Ok();
            throw new Exception($"Deleting brand {id} failed on save");
        }
    }
}