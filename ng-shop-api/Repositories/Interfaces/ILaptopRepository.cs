using System.Collections.Generic;
using System.Threading.Tasks;
using ng_shop_api.Models;

namespace ng_shop_api.Repositories.Interfaces
{
    public interface ILaptopRepository: IGenericRepository
    {
         // User
         Task<IEnumerable<User>> GetAllUsers();
         Task<User> GetUserById(int id);
         
         // Product
         Task<IEnumerable<Product>> GetAllProducts();
         Task<Product> GetProductById(int id);

         // Brand
         Task<IEnumerable<Brand>> GetAllBrands();
         Task<Brand> GetBrandById(int id);

         // Image
         Task<Image> GetImageById(int id);
    }
}