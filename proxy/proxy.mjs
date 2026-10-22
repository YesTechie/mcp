#!/usr/bin/env node
// YesTechie MCP proxy: forwards MCP JSON-RPC to the public remote server (Streamable HTTP, stateless JSON).
// No dependencies, no secrets, no API key: the remote tools are public.
//   stdio (default):  one JSON-RPC message per line on stdin -> POST -> response line on stdout
//   http (MODE=http): POST /mcp on PORT (default 8080) -> forwarded as-is
import http from 'node:http'
import readline from 'node:readline'

const UPSTREAM = process.env.MCP_UPSTREAM || 'https://yestechie.com/api/mcp'
const UA = 'yestechie-mcp-proxy/1.0 (+https://github.com/YesTechie/mcp)'
const MAX = 65536

async function forward(body, extra = {}) {
  const res = await fetch(UPSTREAM, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'user-agent': UA, ...extra },
    body,
  })
  return { status: res.status, text: await res.text(), headers: res.headers }
}

function stdio() {
  const rl = readline.createInterface({ input: process.stdin })
  rl.on('line', async (line) => {
    if (!line.trim()) return
    let id = null
    try { id = JSON.parse(line).id ?? null } catch {}
    try {
      const r = await forward(line)
      if (r.status === 202 || !r.text) return // notification
      process.stdout.write(r.text.replace(/\n/g, ' ') + '\n')
    } catch (e) {
      if (id !== null) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code: -32603, message: `Upstream unreachable: ${e.message}` } }) + '\n')
    }
  })
}

function httpServer() {
  const port = Number(process.env.PORT || 8080)
  http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/healthz') return res.writeHead(200).end('ok')
    if (req.method !== 'POST' || !req.url.startsWith('/mcp')) return res.writeHead(405, { Allow: 'POST' }).end()
    let body = ''
    req.on('data', (c) => { body += c; if (body.length > MAX) req.destroy() })
    req.on('end', async () => {
      try {
        const r = await forward(body)
        const h = { 'content-type': r.headers.get('content-type') || 'application/json' }
        for (const k of ['retry-after', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset']) if (r.headers.get(k)) h[k] = r.headers.get(k)
        res.writeHead(r.status, h).end(r.text)
      } catch (e) {
        res.writeHead(502, { 'content-type': 'application/json' }).end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32603, message: 'Upstream unreachable' } }))
      }
    })
  }).listen(port, () => console.error(`yestechie-mcp-proxy http on :${port} -> ${UPSTREAM}`))
}

process.env.MODE === 'http' ? httpServer() : stdio()
