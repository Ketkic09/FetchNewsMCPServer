import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

const APIKEY = process.env.API_KEY

const server = new McpServer({
    name: 'News Fetcher',
    version: '1.0.0',
})

server.tool(
    "fetchNews",
    { topic: z.string() },
    async ({ topic }) => {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${APIKEY}`,{
        headers:{
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {

        return {
          content: [{ type: "text", text: "Error fetching news" }]
        };
      }
      const data = await response.json();

      const titles = data.articles.map(article => {
        return article.title
      })
      const titleText = titles.join("\n")
      return {
        content: [{ type: "text", text: JSON.stringify(titleText) }]
      }
    }
);


async function init() {
    const transport = new StdioServerTransport();
    const serverResponse = JSON.stringify(await server.connect(transport));
}

init()

