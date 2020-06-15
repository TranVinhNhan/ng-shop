using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ng_shop_api.Data;
using ng_shop_api.Dtos;
using ng_shop_api.Models;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IMapper _mapper;
        public ProductController(ILaptopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _repo.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _repo.GetProductById(id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductForCreateDto productForCreateDto)
        {
            var product = _mapper.Map<Product>(productForCreateDto);
            var brand = await _repo.GetBrandById(productForCreateDto.BrandId);
            brand.Products.Add(product);
            if (await _repo.SaveAll())
            {
                return CreatedAtRoute("GetProductById", new { Controller = "Product", id = product.Id }, product);
            }
            throw new Exception($"Adding Car Part {productForCreateDto.ProductName} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductById(int id, [FromBody]ProductForUpdateDto productForUpdateDto)
        {
            var product = await _repo.GetProductById(id);
            var brand = await _repo.GetBrandById(productForUpdateDto.BrandId);
            if (product == null || brand == null)
            {
                return NotFound();
            }

            var updatedProduct = _mapper.Map(productForUpdateDto, product);

            updatedProduct.Brand = brand;

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating product {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductById(int id)
        {
            var product = await _repo.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            _repo.Delete<Product>(product);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Deleting product {id} failed on save");
        }
    }
}