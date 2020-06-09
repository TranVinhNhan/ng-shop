using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ng_shop_api.Data;
using ng_shop_api.Repositories.Implements;
using ng_shop_api.Repositories.Interfaces;
using AutoMapper;
using ng_shop_api.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace ng_shop_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Handling Exception https://docs.microsoft.com/en-us/aspnet/core/web-api/handle-errors?view=aspnetcore-3.1
            services.AddControllers(options =>
                     options.Filters.Add(new HttpResponseExceptionFilter()))
                     .ConfigureApiBehaviorOptions(options =>
                    {
                        options.InvalidModelStateResponseFactory = context =>
                        {
                            var result = new BadRequestObjectResult(context.ModelState);

                            // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames
                            result.ContentTypes.Add(MediaTypeNames.Application.Json);
                            result.ContentTypes.Add(MediaTypeNames.Application.Xml);

                            return result;
                        };

                        options.SuppressConsumesConstraintForFormFileParameters = true;
                        options.SuppressInferBindingSourcesForParameters = true;
                        options.SuppressModelStateInvalidFilter = true;
                        options.SuppressMapClientErrors = true;
                        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
                            "https://httpstatuses.com/404";
                    })
                    // Handling Newtonsoft Json decoding
                    .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<LaptopDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Automapper 7.0.0
            services.AddAutoMapper(typeof(AutoMapping));

            // Seed data service in ./data/Seed.cs
            services.AddTransient<Seed>();


            // Auth service
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ILaptopRepository, LaptopRepository>();

            // Enable CORS https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-3.1
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyHeader()
                               .AllowAnyMethod()
                               .AllowAnyOrigin();
                    });
            });

            // JWT Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/error-local-development");
            }
            else
            {
                app.UseExceptionHandler("/error");
            }


            seeder.SeedProduct();

            app.UseHttpsRedirection();

            app.UseRouting();

            // Enable CORS https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-3.1
            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
