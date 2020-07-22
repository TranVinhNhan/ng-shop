namespace ng_shop_api.Dtos
{
    public class AddressForReturnDto
    {
        public string Fullname { get; set; }
        public string Street { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public AddressForReturnDto()
        { }
        public AddressForReturnDto(string fullname, string street, string district, string city)
        {
            Fullname = fullname;
            Street = street;
            District = district;
            City = city;
        }
    }
}