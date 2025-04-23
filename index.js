import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';
// import mcp.server from FastMCP


const server = new McpServer({
    name: 'TechCrunch News Fetcher',
    version: '1.0.0',

})

// async function getNewsByTopic(topic) {
//     if (topic.toLowerCase() === "computers") {
//         return "computers searched"
//     }    
//     if (topic.toLowerCase() === "finance") {
//         return "finance searched"
//     }
//     // return { code: 404, content: "Something went wrong" }
//     // return { code: 200, content: "success" }
//     return "misc"
// }

// server.tool('getTechCrunchData', {
//     topic: z.string()
// }, async ({ topic }) => {
//     return { content: [{ type: "text", text: JSON.stringify(await getNewsByTopic(topic)) }] }
// })

server.tool(
    "fetchNews",
    { topic: z.string() },
    async ({ topic }) => {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=821f18dc9fe444cbb3460456d1dabc1f`);
      const data = JSON.stringify(response.articles[0]['title']);
      return {
        content: [{ type: "text", text: data }]
      };
    }
);


function addNo(a,b){
    const sum = a+b
    return sum
}



server.tool('addTwoNos', {
    a: z.number(),
    b: z.number()
}, async ({ a,b }) => ({
    content: [{ type: "text", text: String(addNo(a,b)) }]

})
)


// server.start({
//       transportType: "stdio",
// });

async function init() {
    const transport = new StdioServerTransport();
    // console.log("transport created", transport)
    const serverResponse = JSON.stringify(await server.connect(transport));
    console.log(serverResponse)
    // console.log("Server connected")
}

init()

