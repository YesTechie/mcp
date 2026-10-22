# YesTechie MCP proxy for registries / sandboxes (e.g. Glama). Forwards stdio (default) or HTTP MCP to
# https://yestechie.com/api/mcp. No dependencies, no secrets, runs as the unprivileged node user.
FROM node:22-alpine
WORKDIR /app
COPY proxy/proxy.mjs ./proxy.mjs
USER node
ENV NODE_ENV=production
# stdio by default; set MODE=http (and PORT) to expose POST /mcp
ENTRYPOINT ["node", "/app/proxy.mjs"]
