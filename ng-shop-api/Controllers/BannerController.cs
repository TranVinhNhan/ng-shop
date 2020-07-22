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
    [Route("api/{controller}")]
    public class BannerController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IMapper _mapper;
        public BannerController(ILaptopRepository repo, IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper)
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

        [HttpPost]
        public async Task<IActionResult> AddBannerImage([FromForm] ImageForCreateDto imageForCreateDto)
        {
            var file = imageForCreateDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(1920).Height(600).Crop("fill")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            imageForCreateDto.Url = uploadResult.Url.ToString();
            imageForCreateDto.PublicId = uploadResult.PublicId;

            var image = _mapper.Map<Image>(imageForCreateDto);
            image.IsThumbnail = false;
            image.IsBanner = true;
            _repo.Add(image);

            if (await _repo.SaveAll())
            {
                return StatusCode(201);
            }

            return BadRequest("Could not add the image");
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllBanner()
        {
            var images = await _repo.GetBannerImages();

            if (images == null)
                return NotFound();

            return Ok(images);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var banner = await _repo.GetImageById(id);

            if (banner == null)
                return NotFound();

            var deleteParams = new DeletionParams(banner.PublicId);

            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok")
                _repo.Delete(banner);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete banner");
        }
    }
}