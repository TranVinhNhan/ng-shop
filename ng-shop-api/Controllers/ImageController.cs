using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ng_shop_api.Dtos;
using ng_shop_api.Helpers;
using ng_shop_api.Models;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Controllers
{
    [ApiController]
    [Route("api/product/{productId}/images")]
    public class ImageController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ImageController(ILaptopRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        [HttpGet("{id}", Name = "GetImageById")]
        public async Task<IActionResult> GetImageById(int id)
        {
            var image = await _repo.GetProductById(id);
            return Ok(image);
        }

        [HttpPost]
        public async Task<IActionResult> AddImageForProduct(int productId, [FromForm] ImageForCreateDto imageForCreateDto)
        {
            var product = await _repo.GetProductById(productId);
            if (product == null)
            {
                return NotFound();
            }

            var file = imageForCreateDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                        // Transformation = new Transformation().Width(200).Height(200).Crop("fill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            imageForCreateDto.Url = uploadResult.Url.ToString();
            imageForCreateDto.PublicId = uploadResult.PublicId;

            var image = _mapper.Map<Image>(imageForCreateDto);

            image.IsThumbnail = product.Images.Any(i => i.IsThumbnail) ? false : true;

            product.Images.Add(image);

            if (await _repo.SaveAll())
            {
                // return CreatedAtRoute("GetImageById", new { id = image.Id }, image);
                return Ok(image);
            }

            return BadRequest("Could not add the image");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int productId, int id)
        {
            var product = await _repo.GetProductById(productId);

            if (!product.Images.Any(p => p.Id == id))
                return BadRequest("Image does not exist");

            var image = await _repo.GetImageById(id);

            var deleteParams = new DeletionParams(image.PublicId);

            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok")
            {
                _repo.Delete(image);
            }

            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Failed to delete image");
        }
    }
}