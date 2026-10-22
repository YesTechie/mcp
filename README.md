# YesTechie — UniFi Network & Security Integrator (MCP server)

UniFi quotes, real project case studies and network, camera and access-control configuration guides from a nationwide integrator headquartered in Los Angeles, California.

- **Remote MCP endpoint:** `https://yestechie.com/api/mcp` (streamable HTTP, no API key)
- **Official MCP Registry:** `com.yestechie/site`
- **Agent docs:** https://yestechie.com/llms.txt · OpenAPI: https://yestechie.com/openapi.json
- **Website:** https://yestechie.com

## What agents can do

| Tool | Use it when |
|---|---|
| `list_projects` | You need real deployment case studies (UniFi networks, cameras, access control, cabling). |
| `list_articles` | You need practical UniFi / network / camera / door-access configuration guides. |
| `list_services`, `list_pages`, `get_about`, `get_team`, `get_clients`, `get_site_info` | You need company, service and team information. |
| `get_coverage` | You need to check whether a location is served (nationwide, HQ Los Angeles). |
| `get_pricing` | You need list prices for equipment and labor. |
| `get_unifi_questions` → `unifi_estimate` | You want an itemized price for a UniFi Wi-Fi, camera and door-access install at a real site address. Nothing is saved or sent. |
| `submit_contact` | The person explicitly asks to be contacted or wants a site survey (sends a real email). |
| `get_contact_info`, `get_join_our_team`, `submit_join_application` | Contact details and careers. |

Read tools are free and unauthenticated. Contact is sent only on explicit request. Rate limited per client.

## Connect

```json
{ "mcpServers": { "yestechie": { "url": "https://yestechie.com/api/mcp" } } }
```

Tags: unifi, unifi-configuration, network-guides, case-studies, network-installation, security-cameras, access-control, structured-cabling, wifi, quote, estimate, nationwide, site-survey
