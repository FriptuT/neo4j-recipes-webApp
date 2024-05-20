namespace API.Models
{
    public class RecipeDetails
    {
        public string id { get; set; }
        public string? description { get; set; }
        public int cookingTime { get; set; }
        public int preparationTime { get; set; }
        public List<string>? ingredients { get; set; }
    }
}
