namespace ng_shop_api.Dtos
{
    public class ProductForUpdateDto
    {
        public string ProductName { get; set; }
        public string ProductShortName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Processor { get; set; }
        public string Memory { get; set; }
        public string Storage { get; set; }
        public string Display { get; set; }
        public string Graphics { get; set; }
        public string ChargingAndExpansion { get; set; }
        public string Size { get; set; }
        public string Weight { get; set; }
        public string OperatingSystem { get; set; }
        public decimal Price { get; set; }
        public int BrandId { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsDisplayed { get; set; }
    }
}