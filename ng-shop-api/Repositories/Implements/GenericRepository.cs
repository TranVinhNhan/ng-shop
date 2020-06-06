using System.Threading.Tasks;
using ng_shop_api.Data;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Repositories.Implements
{
    public class GenericRepository : IGenericRepository
    {
        private readonly LaptopDbContext _context;
        public GenericRepository(LaptopDbContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }


    }
}