
# MCP Server
This repository implements server which uses the MCP protocol with STDIO transport and Caude Desktop as client.
MCP protocol knows how to take request from Client (Claude desktop) and return a valid response for it.





## What it does?
  This MCP server has the following tools:
  - Returns latest news headline about the asked topic

## How to use?
    1. Clone this respository
    2. Run npm i
    3. Save 'claude_desktop_config.json' file where the cluade desktop application resides on your machine
    4. Run server "node <index.js file path>"
    5. Relaunch Claude desktop
    6. Ask news about any topic eg."Give me news about Technology"

## Tech Stack

**Client:** Claude Desktop

**Server:** MCP protocol, JavaScript, NodeJs

