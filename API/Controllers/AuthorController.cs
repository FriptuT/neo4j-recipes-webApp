using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController: ControllerBase
    {
        private readonly Neo4jService _neo4JService;

        public AuthorController(Neo4jService neo4JService)
        {
            _neo4JService = neo4JService;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetAuthorsRecipes(string name)
        {
            var authorsRecipes = new List<authorRecipes>();
            await using var session  = await _neo4JService.GetSessionAsync();

            var result = await session.ExecuteReadAsync(async tx =>
            {
                var query = @"
                MATCH (n:Author {name: $name}) - [w:WROTE] -> (r:Recipe)
                RETURN r.name as recipeName LIMIT 16";

                var queryResult = await tx.RunAsync(query, new { name });

                return await queryResult.ToListAsync();
            });


            foreach (var record in result)
            {
                var recipes = new authorRecipes
                {
                    name = record["recipeName"].As<string>()
                };
                authorsRecipes.Add(recipes);
            }

            return Ok(authorsRecipes);
        }
    }
}