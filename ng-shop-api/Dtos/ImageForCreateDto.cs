using Microsoft.AspNetCore.Http;

namespace ng_shop_api.Dtos
{
    public class ImageForCreateDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }
    }
}