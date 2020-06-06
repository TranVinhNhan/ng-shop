using System.Collections.Generic;
using System.Threading.Tasks;
using ng_shop_api.Models;

namespace ng_shop_api.Repositories.Interfaces
{
    public interface ILaptopRepository: IGenericRepository
    {
         // User
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}