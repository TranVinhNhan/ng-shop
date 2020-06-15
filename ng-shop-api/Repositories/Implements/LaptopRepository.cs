using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ng_shop_api.Data;
using ng_shop_api.Models;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Repositories.Implements
{
    public class LaptopRepository : GenericRepository, ILaptopRepository
    {
        private readonly LaptopDbContext _context;
        public LaptopRepository(LaptopDbContext context) : base(context)
        {
            _context = context;
        }

        // User
        public async Task<User> GetUserById(int id)
        {
            var user = await _context.Users.Include(u => u.Orders).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        // Product
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var products = await _context.Products.Include(p => p.Brand).ToListAsync();
            return products;
        }
        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products.Include(p => p.Brand).FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        // Brand
        public async Task<IEnumerable<Brand>> GetAllBrands()
        {
            var brands = await _context.Brands.Include(b => b.Products).ToListAsync();
            return brands;
        }

        public async Task<Brand> GetBrandById(int id)
        {
            var brand = await _context.Brands.Include(b => b.Products).FirstOrDefaultAsync(b => b.Id == id);
            return brand;
        }
    }
}