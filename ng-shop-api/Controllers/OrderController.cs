using Microsoft.AspNetCore.Mvc;
using ng_shop_api.Repositories.Interfaces;
using ng_shop_api.Dtos;
using System.Threading.Tasks;
using AutoMapper;
using ng_shop_api.Models;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;

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
    }
}