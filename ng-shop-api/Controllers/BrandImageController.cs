using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ng_shop_api.Dtos;
using ng_shop_api.Helpers;
using ng_shop_api.Models;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/brand/{brandId}/images")]
    public class BrandImageController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;
        public BrandImageController(ILaptopRepository repo, IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper)
        {
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;

            // Tạo account
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            // Init instance gọi api
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = nameof(GetBrandImageById))]
        public async Task<IActionResult> GetBrandImageById(int id)
        {
            var image = await _repo.GetImageById(id);

            if (image == null)
                return NotFound();

            return Ok(image);
        }

        [HttpPost]
        public async Task<IActionResult> AddImageForBrand(int brandId, [FromForm] ImageForCreateDto imageForCreateDto)
        {
            var brand = await _repo.GetBrandById(brandId);
            if (brand == null)
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
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            imageForCreateDto.Url = uploadResult.Url.ToString();
            imageForCreateDto.PublicId = uploadResult.PublicId;

            var image = _mapper.Map<Image>(imageForCreateDto);
            image.IsThumbnail = true;
            brand.Image = image;

            if (await _repo.SaveAll())
            {
                var routeValues = new { brandId, image.Id };
                return CreatedAtRoute(nameof(GetBrandImageById), routeValues, image);
            }

            return BadRequest("Could not add the image");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int brandId, int id)
        {
            var brand = await _repo.GetBrandById(brandId);

            if (brand.Image.Id == id)
            {
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

            return BadRequest("Image does not exist");
        }
    }
}