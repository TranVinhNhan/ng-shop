namespace ng_shop_api.Dtos
{
    public class UserForUpdateDto
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public bool IsMale { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string AddressNumber { get; set; }
    }
}