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

        // Users
        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Orders).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}