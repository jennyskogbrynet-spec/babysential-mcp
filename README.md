# Babysential MCP Server

> AI assistant integration for [Babysential.com](https://babysential.com) — Scandinavia's trusted parenting resource

Give your AI assistant access to expert baby knowledge: name suggestions, milestone tracking, sleep guides, and product recommendations.

## Available Tools

| Tool | Description |
|------|-------------|
| `get_baby_name_suggestions` | Filter baby names by theme, origin, gender, syllables |
| `get_milestone_tracker` | Developmental milestones by age (motor, language, cognitive, social) |
| `get_sleep_guide` | Evidence-based sleep guidance by age in weeks |
| `get_product_recommendations` | Baby product picks by category and budget (NOK) |
| `get_baby_development_overview` | Complete development snapshot for any age |

## Quick Start

### Install

```bash
npm install -g babysential-mcp
# or clone and build:
git clone https://github.com/jennyskogbrynet-spec/babysential-mcp
cd babysential-mcp
npm install && npm run build
```

### Add to Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

If installed globally via npm:
```json
{
  "mcpServers": {
    "babysential": {
      "command": "babysential-mcp"
    }
  }
}
```

Restart Claude Desktop. You'll see Babysential tools available in your conversation.

### Add to Cursor / VS Code (via MCP extension)

```json
{
  "mcp.servers": {
    "babysential": {
      "command": "node",
      "args": ["/path/to/babysential-mcp/dist/index.js"]
    }
  }
}
```

### Test with MCP Inspector

```bash
# Build first
npm run build

# Run inspector
npm run inspector
# or:
npx @modelcontextprotocol/inspector node dist/index.js
```

## Example Prompts (after adding to Claude)

```
"Suggest Scandinavian girl names with 2 syllables related to nature"

"What milestones should my 8-month-old be reaching?"

"My baby is 16 weeks old — how much should they sleep?"

"What baby carriers work well under 1500 NOK?"

"Give me a full development overview for a 6-month-old"
```

## Development

```bash
npm install
npm run dev     # run directly with ts-node
npm run build   # compile to dist/
npm start       # run compiled version
```

## Data Sources

All recommendations are based on:
- WHO (World Health Organization) developmental guidelines
- AAP (American Academy of Pediatrics) sleep recommendations
- Babysential.com editorial team research

## License

MIT — Built by [Babysential](https://babysential.com)
