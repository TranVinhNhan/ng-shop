using System.Threading.Tasks;
using ng_shop_api.Models;

namespace ng_shop_api.Repositories.Interfaces
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string email, string password);
         Task<bool> UserExist(string email);
    }
}