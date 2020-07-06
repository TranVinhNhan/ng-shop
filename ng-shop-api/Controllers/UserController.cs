using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Dtos;
using ng_shop_api.Models;
using ng_shop_api.Repositories.Interfaces;

namespace ng_shop_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IMapper _mapper;
        public UserController(ILaptopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repo.GetAllUsers();
            if (users == null)
                return NotFound();
            var result = _mapper.Map<IEnumerable<UserForReturnDto>>(users);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonalInfo()
        {
            if (!Request.Headers.ContainsKey("id"))
                return Unauthorized();

            int id = int.Parse(Request.Headers["id"][0]);
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
                return Unauthorized();

            var user = await _repo.GetUserById(id);
            if (user == null)
                return NotFound();

            var userForReturn = _mapper.Map<PersonalInfoForReturnDto>(user);
            return Ok(userForReturn);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePersonalInfo([FromBody]PersonalInfoForUpdateDto personalInfoForUpdateDto)
        {
            if (!Request.Headers.ContainsKey("id"))
                return Unauthorized();

            int id = int.Parse(Request.Headers["id"].First());
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
                return Unauthorized();

            var user = await _repo.GetUserById(id);
            if (user == null)
                return NotFound();

            var updatedUser = _mapper.Map(personalInfoForUpdateDto, user);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            var user = await _repo.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            var updatedUser = _mapper.Map(userForUpdateDto, user);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _repo.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _repo.Delete<User>(user);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Deleting user {id} failed on save");
        }
    }
}