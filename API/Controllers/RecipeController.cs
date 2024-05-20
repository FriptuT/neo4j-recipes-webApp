
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly Neo4jService _neo4JService;

        public RecipeController(Neo4jService neo4JService)
        {
            _neo4JService = neo4JService;
        }


        [HttpGet]
        public async Task<IActionResult> Get(string name = null)
        {
            // name, author, nr_ingredients, skillLevel
            var recipes = new List<Recipe>();

            await using var session = await _neo4JService.GetSessionAsync();
            var result = await session.ExecuteReadAsync(async tx =>
            {
                var queryBuilder = new System.Text.StringBuilder(@"
                MATCH (r:Recipe)
                MATCH (autor:Author)-[:WROTE]->(r)
                MATCH (r)-[how_manny:CONTAINS_INGREDIENT]->(ingredient:Ingredient)
                ");

                if (!string.IsNullOrEmpty(name))
                {
                    queryBuilder.Append(" WHERE r.name CONTAINS $name");
                }

                queryBuilder.Append(@"
                RETURN r.id as ID,r.name AS Nume, autor.name AS Author, COUNT(how_manny) AS numberOfIngredients, r.skillLevel AS skillLevel
                LIMIT 16
                ");

                var query = queryBuilder.ToString();

                var parameters = new Dictionary<string, object>
                {
                    { "name", name }
                };

                var queryResult = await tx.RunAsync(query, parameters);

                return await queryResult.ToListAsync();

            });
            foreach (var record in result)
            {
                var recipe = new Recipe
                {
                    id = record["ID"].As<string>(),
                    name = record["Nume"].As<string>(),
                    author = record["Author"].As<string>(),
                    nr_ingredients = record["numberOfIngredients"].As<int>(),
                    skillLevel = record["skillLevel"].As<string>()
                };
                recipes.Add(recipe);
            }

            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipeDetails(string id)
        {
            await using var session = await _neo4JService.GetSessionAsync();

            var result = await session.ExecuteReadAsync(async tx =>
            {
                var query = @"
                MATCH (r:Recipe {id: $id}) - [:CONTAINS_INGREDIENT] -> (i:Ingredient)
                RETURN r.id as ID,
                    r.description as description, 
                    r.cookingTime as cookingTime, 
                    r.preparationTime as preparationTime,
                    collect(i.name) as ingredients";

                var queryResult = await tx.RunAsync(query, new { id });

                return await queryResult.SingleAsync();
            });

            if (result == null)
            {
                return NotFound();
            }

            var recipeDetails = new RecipeDetails
            {
                id = result["ID"].As<string>(),
                description = result["description"].As<string>(),
                cookingTime = result["cookingTime"].As<int>(),
                preparationTime = result["preparationTime"].As<int>(),
                ingredients = result["ingredients"].As<List<string>>()
            };

            return Ok(recipeDetails);
        }


    }
}
