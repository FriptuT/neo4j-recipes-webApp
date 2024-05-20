namespace API.Models
{
    public class Recipe
    {
        public string id { get; set;}
        public string? name {  get; set; }
        public string? author { get; set; }
        public int? nr_ingredients { get; set; }
        public string? skillLevel { get; set; }
    }

    
}
