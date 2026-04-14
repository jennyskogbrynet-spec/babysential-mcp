const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { WebStandardStreamableHTTPServerTransport } = require("@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js");
const { z } = require("zod");
const {
  BABY_NAMES,
  SLEEP_GUIDES,
  MILESTONES,
  PRODUCT_RECOMMENDATIONS,
} = require("../dist/data.js");

// CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
};

function createServer() {
  const server = new McpServer({
    name: "babysential",
    version: "1.0.0",
    description:
      "Baby name suggestions, milestone tracking, sleep guides, and product recommendations from Babysential.com",
  });

  // Tool 1: Baby Name Suggestions
  server.tool(
    "get_baby_name_suggestions",
    "Get baby name suggestions filtered by theme, origin, gender, or syllable count. Returns names with meanings, popularity scores, and origins.",
    {
      theme: z
        .string()
        .optional()
        .describe(
          "Name theme (e.g. 'nordic', 'nature', 'classic', 'short', 'popular')"
        ),
      origin: z
        .string()
        .optional()
        .describe(
          "Name origin (e.g. 'Scandinavian', 'Norwegian', 'Norse', 'Latin')"
        ),
      gender: z
        .enum(["boy", "girl", "unisex", "any"])
        .optional()
        .default("any")
        .describe("Baby's gender"),
      syllables: z
        .number()
        .min(1)
        .max(5)
        .optional()
        .describe("Number of syllables"),
      limit: z
        .number()
        .min(1)
        .max(20)
        .optional()
        .default(10)
        .describe("Max results"),
    },
    async ({ theme, origin, gender, syllables, limit = 10 }) => {
      let results = [...BABY_NAMES];
      if (gender && gender !== "any")
        results = results.filter(
          (n) => n.gender === gender || n.gender === "unisex"
        );
      if (origin) {
        const o = origin.toLowerCase();
        results = results.filter((n) =>
          n.origin.toLowerCase().includes(o)
        );
      }
      if (theme) {
        const t = theme.toLowerCase();
        results = results.filter(
          (n) =>
            n.themes.some((th) => th.toLowerCase().includes(t)) ||
            n.meaning.toLowerCase().includes(t)
        );
      }
      if (syllables) results = results.filter((n) => n.syllables === syllables);
      results.sort((a, b) => b.popularity - a.popularity);
      results = results.slice(0, limit);

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No baby names found matching your criteria. Try broadening your search.",
            },
          ],
        };
      }

      const formatted = results
        .map(
          (n, i) =>
            `${i + 1}. **${n.name}** (${n.gender}, ${n.origin})\n   Meaning: "${n.meaning}"\n   Syllables: ${n.syllables} | Popularity: ${n.popularity}/100`
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `# Baby Name Suggestions\n\n${formatted}\n\n---\n🔍 Explore more: https://babysential.com/tools/name-finder`,
          },
        ],
      };
    }
  );

  // Tool 2: Milestone Tracker
  server.tool(
    "get_milestone_tracker",
    "Get developmental milestones for a baby at a specific age in months.",
    {
      age_months: z
        .number()
        .min(0)
        .max(36)
        .describe("Baby's age in months (0-36)"),
      category: z
        .enum(["motor", "language", "cognitive", "social", "all"])
        .optional()
        .default("all")
        .describe("Milestone category"),
    },
    async ({ age_months, category = "all" }) => {
      const current = MILESTONES.filter(
        (m) =>
          age_months >= m.age_months_min &&
          age_months <= m.age_months_max &&
          (category === "all" || m.category === category)
      );
      const upcoming = MILESTONES.filter(
        (m) =>
          m.age_months_min > age_months &&
          m.age_months_min <= age_months + 3 &&
          (category === "all" || m.category === category)
      );

      const ageLabel =
        age_months === 0 ? "Newborn" : `${age_months} month${age_months === 1 ? "" : "s"}`;
      let text = `# Baby Milestones at ${ageLabel}\n\n`;

      if (current.length > 0) {
        text += `## Current Milestones\n`;
        current.forEach((m) => {
          text += `- **${m.milestone}** (${m.category}): ${m.description}\n`;
        });
      }
      if (upcoming.length > 0) {
        text += `\n## Coming Up (Next 3 Months)\n`;
        upcoming.forEach((m) => {
          text += `- **${m.milestone}** (~${m.age_months_min} months): ${m.description}\n`;
        });
      }
      if (current.length === 0 && upcoming.length === 0) {
        text += `No specific milestones found for ${ageLabel}.\n`;
      }

      text += `\n---\n📊 Track milestones: https://babysential.com/tools/milestones`;
      return { content: [{ type: "text", text }] };
    }
  );

  // Tool 3: Sleep Guide
  server.tool(
    "get_sleep_guide",
    "Get evidence-based sleep guidance for a baby at a specific age in weeks.",
    {
      age_weeks: z
        .number()
        .min(0)
        .max(156)
        .describe("Baby's age in weeks (0-156)"),
    },
    async ({ age_weeks }) => {
      const guide =
        SLEEP_GUIDES.find(
          (g) => age_weeks >= g.age_weeks_min && age_weeks < g.age_weeks_max
        ) || SLEEP_GUIDES[SLEEP_GUIDES.length - 1];

      const text = `# Sleep Guide: ${guide.label}

**Total sleep**: ${guide.total_sleep_hours_min}-${guide.total_sleep_hours_max}h/day
**Night sleep**: ~${guide.night_sleep_hours}h
**Naps**: ${guide.naps_per_day_min}-${guide.naps_per_day_max} per day
**Wake window**: ${guide.wake_window_min_minutes}-${guide.wake_window_max_minutes} min

## Tips
${guide.tips.map((t) => `- ${t}`).join("\n")}

---
🌙 Track sleep: https://babysential.com/tools/sleep-tracker`;

      return { content: [{ type: "text", text }] };
    }
  );

  // Tool 4: Product Recommendations
  server.tool(
    "get_product_recommendations",
    "Get baby product recommendations by category and budget (prices in NOK).",
    {
      category: z
        .enum(["sleep", "feeding", "carrier", "safety", "highchair", "bouncer", "all"])
        .optional()
        .default("all")
        .describe("Product category"),
      budget_nok: z
        .number()
        .optional()
        .describe("Max budget in NOK"),
    },
    async ({ category = "all", budget_nok }) => {
      let products = [...PRODUCT_RECOMMENDATIONS];
      if (category !== "all")
        products = products.filter((p) => p.category === category);
      if (budget_nok)
        products = products.filter((p) => p.price_nok_approx <= budget_nok);
      products.sort((a, b) => a.price_nok_approx - b.price_nok_approx);

      if (products.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No products found${budget_nok ? ` under ${budget_nok} NOK` : ""}.`,
            },
          ],
        };
      }

      const formatted = products
        .map(
          (p, i) =>
            `${i + 1}. **${p.name}** (~${p.price_nok_approx} NOK, ${p.age_range})\n   ${p.description}\n   Pros: ${p.pros.join(", ")}`
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `# Product Recommendations\n\n${formatted}\n\n---\n💡 More guides: https://babysential.com/articles`,
          },
        ],
      };
    }
  );

  // Tool 5: Baby Development Overview
  server.tool(
    "get_baby_development_overview",
    "Get a complete development overview for a baby at a specific age.",
    {
      age_months: z
        .number()
        .min(0)
        .max(36)
        .describe("Baby's age in months"),
    },
    async ({ age_months }) => {
      const age_weeks = Math.round(age_months * 4.33);
      const ageLabel =
        age_months === 0 ? "Newborn" : `${age_months} month${age_months === 1 ? "" : "s"}`;

      const guide =
        SLEEP_GUIDES.find(
          (g) => age_weeks >= g.age_weeks_min && age_weeks < g.age_weeks_max
        ) || SLEEP_GUIDES[SLEEP_GUIDES.length - 1];

      const currentMilestones = MILESTONES.filter(
        (m) => age_months >= m.age_months_min && age_months <= m.age_months_max
      );

      let text = `# Baby Development at ${ageLabel}\n\n`;
      text += `## 😴 Sleep (${guide.label})\n`;
      text += `- Total: ${guide.total_sleep_hours_min}-${guide.total_sleep_hours_max}h/day\n`;
      text += `- Naps: ${guide.naps_per_day_min}-${guide.naps_per_day_max}\n`;
      text += `- Wake window: ${guide.wake_window_min_minutes}-${guide.wake_window_max_minutes} min\n\n`;

      text += `## 🌱 Milestones\n`;
      if (currentMilestones.length > 0) {
        currentMilestones.forEach((m) => {
          text += `- **${m.milestone}** (${m.category}): ${m.description}\n`;
        });
      } else {
        text += "No specific milestones for this exact age.\n";
      }

      text += `\n---\n📊 https://babysential.com/tools/milestones`;
      return { content: [{ type: "text", text }] };
    }
  );

  return server;
}

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200, CORS_HEADERS);
    res.end();
    return;
  }

  // Only accept POST for MCP requests
  if (req.method !== "POST") {
    res.writeHead(405, { ...CORS_HEADERS, "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed. Use POST for MCP requests." }));
    return;
  }

  try {
    const server = createServer();
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless
    });

    await server.connect(transport);

    // Convert Node.js req/res to Web Standard Request/Response
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    const webRequest = new Request(
      `https://${req.headers.host}${req.url}`,
      {
        method: req.method,
        headers: new Headers(req.headers),
        body: body,
      }
    );

    const webResponse = await transport.handleRequest(webRequest);

    // Convert Web Standard Response back to Node.js res
    const headers = {};
    webResponse.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Merge CORS headers
    const finalHeaders = { ...headers, ...CORS_HEADERS };

    res.writeHead(webResponse.status, finalHeaders);

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();

    await transport.close();
  } catch (err) {
    console.error("MCP handler error:", err);
    res.writeHead(500, { ...CORS_HEADERS, "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal error" },
      })
    );
  }
};
