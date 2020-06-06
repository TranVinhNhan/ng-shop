using Microsoft.EntityFrameworkCore;
using ng_shop_api.Models;

namespace ng_shop_api.Data
{
    public class LaptopDbContext: DbContext
    {
        public LaptopDbContext(DbContextOptions<LaptopDbContext> options) : base(options)
        {   }

        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}