using System.Threading.Tasks;

namespace ng_shop_api.Repositories.Interfaces
{
    public interface IGenericRepository
    {
        // Generic
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         void Update<T>(T entity) where T: class;
         Task<bool> SaveAll();
    }
}