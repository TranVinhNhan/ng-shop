using AutoMapper;
using ng_shop_api.Dtos;
using ng_shop_api.Models;

namespace ng_shop_api.Helpers
{
    public class AutoMapping: Profile
    {
        public AutoMapping()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<ProductForCreateDto, Product>();
            CreateMap<ProductForUpdateDto, Product>();
        }
    }
}