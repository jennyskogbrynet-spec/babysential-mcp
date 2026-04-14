# Babysential MCP Server

> AI assistant integration for [Babysential.com](https://babysential.com) — Scandinavia's trusted parenting resource

Give your AI assistant expert baby knowledge: name suggestions, milestone tracking, sleep guides, and product recommendations — all from Babysential.com.

**🌐 Live endpoint:** `https://babysential-mcp.vercel.app/mcp`  
**📦 npm:** `npm install -g babysential-mcp`  
**🏥 Health check:** [babysential-mcp.vercel.app/health](https://babysential-mcp.vercel.app/health)

---

## Available Tools

| Tool | Description |
|------|-------------|
| `get_baby_name_suggestions` | Filter baby names by theme, origin, gender, syllables |
| `get_milestone_tracker` | Developmental milestones by age in months (motor, language, cognitive, social) |
| `get_sleep_guide` | Evidence-based sleep guidance by age in weeks |
| `get_product_recommendations` | Baby product picks by category and budget (NOK) |
| `get_baby_development_overview` | Complete development snapshot: sleep + milestones for any age |

---

## Quick Install

### Option A — npm (local stdio, recommended for Claude Desktop)

```bash
npm install -g babysential-mcp
```

### Option B — Remote HTTP (no install needed)

Use the live Vercel endpoint directly: `https://babysential-mcp.vercel.app/mcp`

---

## Add to Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

**Via npm (stdio):**
```json
{
  "mcpServers": {
    "babysential": {
      "command": "babysential-mcp"
    }
  }
}
```

**Via remote HTTP:**
```json
{
  "mcpServers": {
    "babysential": {
      "url": "https://babysential-mcp.vercel.app/mcp"
    }
  }
}
```

Restart Claude Desktop after saving.

---

## Add to Cursor

In `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

**Via npm:**
```json
{
  "mcpServers": {
    "babysential": {
      "command": "babysential-mcp",
      "type": "stdio"
    }
  }
}
```

**Via remote HTTP:**
```json
{
  "mcpServers": {
    "babysential": {
      "url": "https://babysential-mcp.vercel.app/mcp",
      "type": "http"
    }
  }
}
```

---

## Add via mcp.json (generic)

```json
{
  "servers": {
    "babysential": {
      "url": "https://babysential-mcp.vercel.app/mcp"
    }
  }
}
```

---

## Tool Reference

### `get_baby_name_suggestions`

Filter Scandinavian and international baby names.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `theme` | string (optional) | `nordic`, `nature`, `classic`, `short`, `popular`, `biblical`, `mythology` |
| `origin` | string (optional) | `Scandinavian`, `Norwegian`, `Norse`, `Latin`, `Hebrew`, `Irish`, `Greek` |
| `gender` | string (optional) | `boy`, `girl`, `unisex`, `any` (default: `any`) |
| `syllables` | number (optional) | 1–5 |
| `limit` | number (optional) | 1–20 (default: 10) |

**Example request:**
```json
{
  "name": "get_baby_name_suggestions",
  "arguments": { "theme": "nordic", "gender": "girl", "syllables": 2 }
}
```

**Example response:**
```
# Baby Name Suggestions

1. **Freya** (girl, Norse)
   Meaning: "goddess of love and beauty"
   Syllables: 2 | Popularity: 91/100

2. **Astrid** (girl, Scandinavian)
   Meaning: "divinely beautiful"
   Syllables: 2 | Popularity: 88/100
```

---

### `get_milestone_tracker`

Developmental milestones by baby's age.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `age_months` | number (required) | 0–36 |
| `category` | string (optional) | `motor`, `language`, `cognitive`, `social`, `all` (default: `all`) |

**Example request:**
```json
{
  "name": "get_milestone_tracker",
  "arguments": { "age_months": 6 }
}
```

---

### `get_sleep_guide`

Evidence-based sleep schedule by baby's age in weeks.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `age_weeks` | number (required) | 0–156 (0–3 years) |

**Example request:**
```json
{
  "name": "get_sleep_guide",
  "arguments": { "age_weeks": 16 }
}
```

**Example response:**
```
# Sleep Guide: 3-6 months

Total sleep: 12-16h/day
Night sleep: ~10h
Naps: 3-4 per day
Wake window: 90-150 min

Tips:
- Start to introduce a simple bedtime routine (bath, feed, song, sleep)
- Many babies start consolidating sleep at 3-4 months
- The 4-month sleep regression is common — wake windows lengthen suddenly
```

---

### `get_product_recommendations`

Curated baby product picks optimised for Scandinavian parents.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string (optional) | `sleep`, `feeding`, `carrier`, `safety`, `highchair`, `bouncer`, `all` |
| `budget_nok` | number (optional) | Max price in Norwegian Kroner |

**Example request:**
```json
{
  "name": "get_product_recommendations",
  "arguments": { "category": "carrier", "budget_nok": 2000 }
}
```

---

### `get_baby_development_overview`

One-shot snapshot: sleep + milestones for any age.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `age_months` | number (required) | 0–36 |

---

## API Endpoint

The MCP server is hosted as a stateless serverless function. It supports the [MCP Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http).

```
POST https://babysential-mcp.vercel.app/mcp
Content-Type: application/json
Accept: application/json, text/event-stream
```

**Initialize:**
```bash
curl -X POST https://babysential-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

**Call a tool:**
```bash
curl -X POST https://babysential-mcp.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_sleep_guide","arguments":{"age_weeks":16}}}'
```

**Health check:**
```bash
curl https://babysential-mcp.vercel.app/health
```

---

## Example Prompts

Once connected, ask your AI assistant:

**Names:**
> "Suggest Nordic baby girl names with 2 syllables"  
> "Find Norwegian mythology-inspired boy names"

**Milestones:**
> "What milestones should my 6-month-old be hitting?"  
> "Give me a full development overview for a 12-month-old"

**Sleep:**
> "My baby is 16 weeks old — what's a good sleep schedule?"  
> "How many hours should a 4-month-old sleep?"

**Products:**
> "What baby carriers are good for a budget of 2000 NOK?"  
> "Recommend sleep gear under 1500 NOK"

---

## Local Development

```bash
git clone https://github.com/jennyskogbrynet-spec/babysential-mcp
cd babysential-mcp
npm install
npm run build        # compile TypeScript
npm run dev          # run with ts-node
npm run inspector    # MCP Inspector UI
```

---

## License

MIT — Built with ❤️ by [Babysential](https://babysential.com)
