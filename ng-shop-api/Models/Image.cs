namespace ng_shop_api.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMainImage { get; set; }
        public string PublicId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}