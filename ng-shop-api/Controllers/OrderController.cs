using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Repositories.Interfaces;
using ng_shop_api.Dtos;
using System.Threading.Tasks;
using AutoMapper;
using ng_shop_api.Models;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ng_shop_api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILaptopRepository _repo;
        private readonly IMapper _mapper;
        public OrderController(ILaptopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderForCreateDto orderForCreateDto)
        {
            var order = _mapper.Map<Order>(orderForCreateDto);
            if (Request.Headers.ContainsKey("id"))
            {
                var user = await _repo.GetUserById(int.Parse(Request.Headers["id"].First()));
                user.Orders.Add(order);
            }

            foreach (var item in orderForCreateDto.ListOfOrderDetailDto)
            {
                var orderDetail = new OrderDetail();
                var product = await _repo.GetProductById(item.ProductId);

                orderDetail.PricePerUnit = item.PricePerUnit;
                orderDetail.Quantity = item.Quantity;
                orderDetail.Product = product;
                orderDetail.ProductShortName = item.ProductShortName;
                order.OrderDetails.Add(orderDetail);
            }

            _repo.Add(order);
            if (await _repo.SaveAll())
                return CreatedAtRoute(nameof(GetOrderById), new { controller = "Order", id = order.Id }, order);

            throw new Exception($"Error, cannot create your order");
        }

        [AllowAnonymous]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAllOrdersByUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
                return Unauthorized();

            var orders = await _repo.GetOrdersOfUser(userId);
            return Ok(orders);
        }

        [AllowAnonymous]
        [HttpPut("cancel/{orderId}")]
        public async Task<IActionResult> CancelUserOrder(int orderId, [FromBody]OrderForUpdateDto orderForUpdateDto)
        {
            if (Request.Headers.ContainsKey("id"))
            {
                if (int.Parse(Request.Headers["id"].First()) == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value))
                {
                    var order = await _repo.GetOrderById(orderId);
                    order.OrderStatus = orderForUpdateDto.OrderStatus;

                    if (await _repo.SaveAll())
                    {
                        return NoContent();
                    }
                }
            }
            return Unauthorized("id not match or not found");
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _repo.GetAllOrders();
            if (orders == null)
                return NotFound();

            return Ok(orders);
        }

        [HttpGet("{id}", Name = nameof(GetOrderById))]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _repo.GetOrderById(id);
            if (order == null)
                return NotFound();

            return Ok(order);
        }  

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _repo.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            _repo.Delete(order);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Deleting order {id} failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody]OrderForUpdateDto orderForUpdateDto)
        {
            var order = await _repo.GetOrderById(id);
            if (order == null)
                return NotFound();

            order.OrderStatus = orderForUpdateDto.OrderStatus;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating order status failed on save");
        }
    }
}