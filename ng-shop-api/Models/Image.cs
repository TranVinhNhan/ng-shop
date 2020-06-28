namespace ng_shop_api.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsThumbnail { get; set; }
        public string PublicId { get; set; }

        public int? ProductId { get; set; }
        public Product Product { get; set; }

        public int? BrandId {get; set;}
        public Brand Brand { get; set; }
    }
}