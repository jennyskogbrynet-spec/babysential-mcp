module.exports = (req, res) => {
  res.json({
    status: "ok",
    name: "babysential-mcp",
    version: "1.0.0",
    description: "MCP server for Babysential — baby names, milestones, sleep guides",
    tools: [
      "get_baby_name_suggestions",
      "get_milestone_tracker", 
      "get_sleep_guide",
      "get_product_recommendations",
      "get_baby_development_overview"
    ],
    install: "npm install -g babysential-mcp",
    npm: "https://www.npmjs.com/package/babysential-mcp",
    docs: "https://github.com/jennyskogbrynet-spec/babysential-mcp"
  });
};
