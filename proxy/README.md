# YesTechie MCP proxy (Docker)

A tiny, dependency-free proxy that forwards MCP to the public YesTechie server at
`https://yestechie.com/api/mcp` (Streamable HTTP, stateless JSON). Built for registry
safety checks such as Glama's. The proxy holds no secrets: every tool on the server is
public and needs no API key.

## Build and run

```bash
docker build -t yestechie-mcp .
# stdio (default): one JSON-RPC message per line
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run -i --rm yestechie-mcp
# HTTP: POST /mcp on port 8080
docker run --rm -p 8080:8080 -e MODE=http yestechie-mcp
```

## Environment
| Var | Default | Meaning |
|---|---|---|
| `MODE` | `stdio` | `stdio` or `http` |
| `PORT` | `8080` | HTTP port (http mode) |
| `MCP_UPSTREAM` | `https://yestechie.com/api/mcp` | Upstream MCP endpoint |

## What it can do
- It exposes exactly the tools the remote server lists (`tools/list`): read-only company info, services,
  project case studies, configuration guides, coverage, list prices, the 2-step UniFi estimate, and
  `submit_contact` / `submit_join_application`. Those two send real email, so call them only when the person asks.
- It writes nothing locally, opens no inbound port in stdio mode, and passes rate-limit headers through.

Prefer connecting straight to `https://yestechie.com/api/mcp` when your client supports remote MCP.
