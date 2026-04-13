# Babysential MCP Server

> AI assistant integration for [Babysential.com](https://babysential.com) — Scandinavia's trusted parenting resource

Give your AI assistant access to expert baby knowledge: name suggestions, milestone tracking, sleep guides, and product recommendations.

**🌐 Live:** [babysential-mcp.vercel.app](https://babysential-mcp.vercel.app) | **📦 npm:** `babysential-mcp`

## Available Tools

| Tool | Description |
|------|-------------|
| `get_baby_name_suggestions` | Filter baby names by theme, origin, gender, syllables |
| `get_milestone_tracker` | Developmental milestones by age (motor, language, cognitive, social) |
| `get_sleep_guide` | Evidence-based sleep guidance by age in weeks |
| `get_product_recommendations` | Baby product picks by category and budget (NOK) |
| `get_baby_development_overview` | Complete development snapshot for any age |

## Quick Start

### Install via npm (recommended)

```bash
npm install -g babysential-mcp
```

### Or clone and build

```bash
git clone https://github.com/jennyskogbrynet-spec/babysential-mcp
cd babysential-mcp
npm install && npm run build
```

## Add to Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "babysential": {
      "command": "babysential-mcp"
    }
  }
}
```

Or if built from source:

```json
{
  "mcpServers": {
    "babysential": {
      "command": "node",
      "args": ["/path/to/babysential-mcp/dist/index.js"]
    }
  }
}
```

## Example Usage

Once connected, you can ask your AI assistant:

**Baby names:**
> "Suggest Nordic baby girl names with 2 syllables"
> "Find Norwegian mythology-inspired boy names"

**Milestones:**
> "What milestones should my 6-month-old be hitting?"
> "Give me a complete development overview for a 12-month-old"

**Sleep:**
> "My baby is 16 weeks old — what's a good sleep schedule?"
> "How many hours should a 4-month-old sleep?"

**Products:**
> "What baby carriers are recommended for a budget of 2000 NOK?"
> "Best strollers under 5000 NOK?"

## Add to Cursor / other IDEs

```json
{
  "mcp": {
    "servers": {
      "babysential": {
        "command": "babysential-mcp",
        "type": "stdio"
      }
    }
  }
}
```

## API Endpoint

Health check and server info:
```
GET https://babysential-mcp.vercel.app/health
```

## Development

```bash
npm install
npm run dev        # run with ts-node
npm run build      # compile TypeScript
npm run inspector  # MCP inspector UI
```

## License

MIT — Built with ❤️ by [Babysential](https://babysential.com)
