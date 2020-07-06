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
            CreateMap<User, UserForReturnDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<User, PersonalInfoForReturnDto>();
            CreateMap<PersonalInfoForUpdateDto, User>();
            CreateMap<ProductForCreateDto, Product>();
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<ImageForCreateDto, Image>();
            CreateMap<OrderForCreateDto, Order>();
            CreateMap<Order, OrderForReturnDto>();
        }
    }
}