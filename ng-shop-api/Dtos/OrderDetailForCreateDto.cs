namespace ng_shop_api.Dtos
{
    public class OrderDetailForCreateDto
    {
        public int ProductId { get; set; }
        public string ProductShortName {get; set;}
        public int Quantity { get; set; }
        public decimal PricePerUnit { get; set; }
    }
}