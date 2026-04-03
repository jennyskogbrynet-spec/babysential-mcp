#!/usr/bin/env node
/**
 * Babysential MCP Server
 * Exposes baby parenting knowledge as MCP tools for AI assistants
 * 
 * Tools:
 *   - get_baby_name_suggestions
 *   - get_milestone_tracker
 *   - get_sleep_guide
 *   - get_product_recommendations
 *   - get_baby_development_overview
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { BABY_NAMES, SLEEP_GUIDES, MILESTONES, PRODUCT_RECOMMENDATIONS } from "./data.js";

const server = new McpServer({
  name: "babysential",
  version: "1.0.0",
  description: "Baby name suggestions, milestone tracking, sleep guides, and product recommendations from Babysential.com — Scandinavia's trusted parenting resource",
});

// ─── Tool 1: Baby Name Suggestions ───────────────────────────────────────────

server.tool(
  "get_baby_name_suggestions",
  "Get baby name suggestions filtered by theme, origin, gender, or syllable count. Returns names with meanings, popularity scores, and origins. Source: Babysential.com",
  {
    theme: z.string().optional().describe("Name theme or style (e.g. 'nordic', 'nature', 'classic', 'short', 'popular', 'biblical', 'mythology')"),
    origin: z.string().optional().describe("Name origin (e.g. 'Scandinavian', 'Norwegian', 'Norse', 'Latin', 'Hebrew', 'Irish', 'Greek')"),
    gender: z.enum(["boy", "girl", "unisex", "any"]).optional().default("any").describe("Baby's gender"),
    syllables: z.number().min(1).max(5).optional().describe("Number of syllables in the name"),
    limit: z.number().min(1).max(20).optional().default(10).describe("Maximum number of names to return"),
  },
  async ({ theme, origin, gender, syllables, limit = 10 }) => {
    let results = [...BABY_NAMES];

    // Filter by gender
    if (gender && gender !== "any") {
      results = results.filter(n => n.gender === gender || n.gender === "unisex");
    }

    // Filter by origin (partial match, case-insensitive)
    if (origin) {
      const originLower = origin.toLowerCase();
      results = results.filter(n => n.origin.toLowerCase().includes(originLower));
    }

    // Filter by theme
    if (theme) {
      const themeLower = theme.toLowerCase();
      results = results.filter(n => 
        n.themes.some(t => t.toLowerCase().includes(themeLower)) ||
        n.meaning.toLowerCase().includes(themeLower)
      );
    }

    // Filter by syllables
    if (syllables) {
      results = results.filter(n => n.syllables === syllables);
    }

    // Sort by popularity descending
    results.sort((a, b) => b.popularity - a.popularity);

    // Limit results
    results = results.slice(0, limit);

    if (results.length === 0) {
      return {
        content: [{
          type: "text",
          text: `No baby names found matching your criteria. Try broadening your search — fewer filters or different theme keywords.\n\nBrowse the full name database at: https://babysential.com/tools/name-finder`,
        }],
      };
    }

    const formatted = results.map((n, i) => 
      `${i + 1}. **${n.name}** (${n.gender}, ${n.origin})\n   Meaning: "${n.meaning}"\n   Syllables: ${n.syllables} | Popularity: ${n.popularity}/100\n   Themes: ${n.themes.join(", ")}`
    ).join("\n\n");

    return {
      content: [{
        type: "text",
        text: `# Baby Name Suggestions\n*Source: [Babysential.com](https://babysential.com/tools/name-finder)*\n\n${formatted}\n\n---\n🔍 **Explore more names** with our interactive tool: https://babysential.com/tools/name-finder`,
      }],
    };
  }
);

// ─── Tool 2: Milestone Tracker ────────────────────────────────────────────────

server.tool(
  "get_milestone_tracker",
  "Get developmental milestones for a baby at a specific age in months. Returns motor, language, cognitive, and social milestones with encouragement tips. Source: Babysential.com",
  {
    age_months: z.number().min(0).max(36).describe("Baby's age in months (0-36)"),
    category: z.enum(["motor", "language", "cognitive", "social", "all"]).optional().default("all").describe("Milestone category to focus on"),
  },
  async ({ age_months, category = "all" }) => {
    // Find current milestones (where age falls within range)
    const current = MILESTONES.filter(m => 
      age_months >= m.age_months_min && age_months <= m.age_months_max &&
      (category === "all" || m.category === category)
    );

    // Find upcoming milestones (next 3 months)
    const upcoming = MILESTONES.filter(m =>
      m.age_months_min > age_months && m.age_months_min <= age_months + 3 &&
      (category === "all" || m.category === category)
    );

    // Find recent achieved milestones (last 2 months)
    const recent = MILESTONES.filter(m =>
      m.age_months_max < age_months && m.age_months_max >= age_months - 2 &&
      (category === "all" || m.category === category)
    );

    const ageLabel = age_months === 0 ? "Newborn" : `${age_months} month${age_months === 1 ? "" : "s"}`;

    let text = `# Baby Milestones at ${ageLabel}\n*Source: [Babysential.com](https://babysential.com/tools/milestones)*\n\n`;
    text += `> Based on WHO and AAP developmental guidelines. Remember: every baby develops at their own pace — these are ranges, not deadlines.\n\n`;

    if (current.length > 0) {
      text += `## 🌟 Typical Milestones at This Age\n`;
      const byCategory: Record<string, typeof current> = {};
      current.forEach(m => {
        if (!byCategory[m.category]) byCategory[m.category] = [];
        byCategory[m.category].push(m);
      });

      for (const [cat, milestones] of Object.entries(byCategory)) {
        const icons: Record<string, string> = { motor: "🏃", language: "💬", cognitive: "🧠", social: "❤️" };
        text += `\n### ${icons[cat] || "📍"} ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n`;
        milestones.forEach(m => {
          text += `- **${m.milestone}**: ${m.description}\n  💡 *How to encourage: ${m.how_to_encourage}*\n`;
        });
      }
    }

    if (upcoming.length > 0) {
      text += `\n## 🔜 Coming Up (Next 3 Months)\n`;
      upcoming.forEach(m => {
        text += `- **${m.milestone}** (around ${m.age_months_min} months): ${m.description}\n`;
      });
    }

    if (recent.length > 0) {
      text += `\n## ✅ Recently Achieved\n`;
      recent.forEach(m => {
        text += `- **${m.milestone}**: ${m.description}\n`;
      });
    }

    if (current.length === 0 && upcoming.length === 0) {
      text += `No specific milestones found for ${ageLabel}. Please check [Babysential's milestone tracker](https://babysential.com/tools/milestones) for detailed information.\n`;
    }

    text += `\n---\n📊 **Track your baby's milestones**: https://babysential.com/tools/milestones`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool 3: Sleep Guide ──────────────────────────────────────────────────────

server.tool(
  "get_sleep_guide",
  "Get evidence-based sleep guidance for a baby at a specific age in weeks. Includes total sleep needs, nap schedule, wake windows, tips, and red flags. Source: Babysential.com",
  {
    age_weeks: z.number().min(0).max(156).describe("Baby's age in weeks (0-156, i.e. 0-3 years)"),
  },
  async ({ age_weeks }) => {
    const guide = SLEEP_GUIDES.find(g => 
      age_weeks >= g.age_weeks_min && age_weeks < g.age_weeks_max
    ) || SLEEP_GUIDES[SLEEP_GUIDES.length - 1]; // Fallback to oldest

    const ageMonths = Math.round(age_weeks / 4.33);
    const ageDisplay = age_weeks < 12 ? `${age_weeks} weeks` : `${ageMonths} months (${age_weeks} weeks)`;

    const text = `# Sleep Guide: ${guide.label}
*Source: [Babysential.com](https://babysential.com/tools/sleep-tracker) — Based on WHO/AAP guidelines*

**Baby's age**: ${ageDisplay}

## 😴 Sleep Needs
- **Total sleep**: ${guide.total_sleep_hours_min}-${guide.total_sleep_hours_max} hours per day
- **Night sleep**: ~${guide.night_sleep_hours} hours
- **Naps per day**: ${guide.naps_per_day_min}-${guide.naps_per_day_max} naps

## ⏰ Wake Windows
Between sleep periods, keep baby awake for:
- **Minimum**: ${guide.wake_window_min_minutes} minutes
- **Maximum**: ${guide.wake_window_max_minutes} minutes (${Math.round(guide.wake_window_max_minutes / 60 * 10) / 10} hours)

> 💡 Watch for sleepy cues (yawning, eye rubbing, zoning out) — don't wait until baby is overtired!

## 📋 Tips for This Stage
${guide.tips.map(t => `- ${t}`).join("\n")}

## 🚩 When to Check with a Doctor
${guide.red_flags.map(r => `- ⚠️ ${r}`).join("\n")}

---
🌙 **Track your baby's sleep**: https://babysential.com/tools/sleep-tracker
📖 **Sleep articles**: https://babysential.com/articles`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool 4: Product Recommendations ─────────────────────────────────────────

server.tool(
  "get_product_recommendations",
  "Get baby product recommendations by category and budget. Includes Scandinavian-friendly brands, prices in NOK, pros, and age ranges. Source: Babysential.com",
  {
    category: z.enum(["sleep", "feeding", "carrier", "safety", "highchair", "bouncer", "all"]).optional().default("all").describe("Product category"),
    budget_nok: z.number().optional().describe("Maximum budget in Norwegian Kroner (NOK)"),
  },
  async ({ category = "all", budget_nok }) => {
    let products = [...PRODUCT_RECOMMENDATIONS];

    if (category !== "all") {
      products = products.filter(p => p.category === category);
    }

    if (budget_nok) {
      products = products.filter(p => p.price_nok_approx <= budget_nok);
    }

    // Sort by price
    products.sort((a, b) => a.price_nok_approx - b.price_nok_approx);

    if (products.length === 0) {
      return {
        content: [{
          type: "text",
          text: `No products found in that category${budget_nok ? ` under ${budget_nok} NOK` : ""}. Try a different category or higher budget.\n\nAvailable categories: sleep, feeding, carrier, safety, highchair, bouncer`,
        }],
      };
    }

    const categoryLabel = category === "all" ? "Baby Products" : category.charAt(0).toUpperCase() + category.slice(1);
    
    let text = `# ${categoryLabel} Recommendations\n*Source: [Babysential.com](https://babysential.com) — Curated for Scandinavian parents*\n\n`;
    if (budget_nok) text += `*Budget: Under ${budget_nok} NOK*\n\n`;

    products.forEach((p, i) => {
      text += `## ${i + 1}. ${p.name}\n`;
      text += `**Category**: ${p.category} | **Price**: ~${p.price_nok_approx} NOK | **Age**: ${p.age_range}\n\n`;
      text += `${p.description}\n\n`;
      text += `**Pros**: ${p.pros.join(" · ")}\n`;
      if (p.safety_note) text += `\n⚠️ **Safety note**: ${p.safety_note}\n`;
      text += "\n";
    });

    text += `---\n💡 **Read more product guides**: https://babysential.com/articles`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Tool 5: Baby Development Overview ───────────────────────────────────────

server.tool(
  "get_baby_development_overview",
  "Get a complete development overview for a baby at a specific age, including sleep, milestones, and feeding guidance in one response. Source: Babysential.com",
  {
    age_months: z.number().min(0).max(36).describe("Baby's age in months"),
  },
  async ({ age_months }) => {
    const age_weeks = Math.round(age_months * 4.33);
    const ageLabel = age_months === 0 ? "Newborn" : `${age_months} month${age_months === 1 ? "" : "s"}`;

    // Sleep guide
    const guide = SLEEP_GUIDES.find(g => age_weeks >= g.age_weeks_min && age_weeks < g.age_weeks_max) || SLEEP_GUIDES[SLEEP_GUIDES.length - 1];

    // Current milestones (top 3 per category)
    const currentMilestones = MILESTONES.filter(m => age_months >= m.age_months_min && age_months <= m.age_months_max);
    const byCategory: Record<string, typeof currentMilestones> = {};
    currentMilestones.forEach(m => {
      if (!byCategory[m.category]) byCategory[m.category] = [];
      byCategory[m.category].push(m);
    });

    const categoryIcons: Record<string, string> = { motor: "🏃", language: "💬", cognitive: "🧠", social: "❤️" };

    let text = `# Baby Development at ${ageLabel}
*Source: [Babysential.com](https://babysential.com) — Scandinavia's trusted parenting resource*

---

## 😴 Sleep (${guide.label})
- **Total**: ${guide.total_sleep_hours_min}-${guide.total_sleep_hours_max}h per day
- **Naps**: ${guide.naps_per_day_min}-${guide.naps_per_day_max} per day
- **Wake window**: ${guide.wake_window_min_minutes}-${guide.wake_window_max_minutes} min between sleep

## 🌱 Developmental Milestones\n`;

    if (Object.keys(byCategory).length > 0) {
      for (const [cat, milestones] of Object.entries(byCategory)) {
        text += `\n**${categoryIcons[cat] || "📍"} ${cat.charAt(0).toUpperCase() + cat.slice(1)}**: `;
        text += milestones.slice(0, 2).map(m => m.milestone).join(", ") + "\n";
      }
    } else {
      text += "*No specific milestones for this exact age — see nearby ages for guidance.*\n";
    }

    text += `
## 🔗 Resources
- 🌙 Sleep tracker: https://babysential.com/tools/sleep-tracker
- 📊 Milestone tracker: https://babysential.com/tools/milestones
- 🍎 Food guide: https://babysential.com/tools/food-guide
- 📚 All articles: https://babysential.com/articles`;

    return { content: [{ type: "text", text }] };
  }
);

// ─── Start Server ─────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Babysential MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
