using Neo4j.Driver;

namespace API.Services
{
    public class Neo4jService
    {
        private readonly IDriver driver;

        public Neo4jService(IConfiguration configuration)
        {
            var uri = configuration["Neo4j:Uri"];
            var username = configuration["Neo4j:Username"];
            var password = configuration["Neo4j:Password"];
            this.driver = GraphDatabase.Driver(uri, AuthTokens.Basic(username, password));
        }

        public Task<IAsyncSession> GetSessionAsync()
        {
            return Task.FromResult(this.driver.AsyncSession());
        }

        public async ValueTask DisposeAsync()
        {
            await this.driver.DisposeAsync();
        }
    }
}
