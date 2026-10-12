const TBC = /to be confirmed/i;

function levelFor(score) {
  return score >= 75 ? "High" : score >= 45 ? "Moderate" : "Developing";
}

export function rateProject(p) {
  const approvalSpec = p.specs.find((s) => s.label === "Approvals")?.value || "";
  const approved = /approved/i.test(approvalSpec) && !TBC.test(approvalSpec);
  const documentation = approved ? 100 : 35;
  const location = TBC.test(p.location) ? 30 : 100;
  const known = p.specs.filter((s) => !TBC.test(s.value)).length;
  const specs = p.specs.length ? Math.round((known / p.specs.length) * 100) : 0;
  const stage = /concept/i.test(p.status.label) ? 40 : /approved/i.test(p.status.label) ? 90 : 80;
  const overall = Math.round((documentation + location + specs + stage) / 4);
  return {
    documentation,
    location,
    specs,
    stage,
    overall,
    levels: {
      documentation: levelFor(documentation),
      location: levelFor(location),
      specs: levelFor(specs),
      stage: levelFor(stage),
    },
  };
}

export function suggestionFor(projects) {
  const rated = projects.map((p) => ({ p, r: rateProject(p) }));
  const best = rated.reduce((a, b) => (b.r.overall > a.r.overall ? b : a));
  const parts = [];
  if (best.r.documentation === 100)
    parts.push("it is the only listing here with company-confirmed HMDA & RERA approvals");
  if (best.r.location >= 75) parts.push("its location is clearly stated");
  if (best.r.specs >= 70) parts.push("its specifications are well documented");
  if (parts.length === 0)
    parts.push("it currently carries the most complete information of the projects you compared");

  const dims = [
    { label: "documentation clarity", key: "documentation", score: best.r.documentation },
    { label: "location clarity", key: "location", score: best.r.location },
    { label: "specification detail", key: "specs", score: best.r.specs },
    { label: "stage certainty", key: "stage", score: best.r.stage },
  ];
  const weakest = dims.reduce((a, b) => (b.score < a.score ? b : a));
  const caveat =
    weakest.levelsFix === undefined && best.r.levels[weakest.key] !== "High"
      ? `Keep in mind: its ${weakest.label} is still ${best.r.levels[weakest.key]} — ask us for the latest documents and current status before you commit.`
      : "Even so, always review the latest documents and independently verify every detail before you commit.";

  return { best: best.p, reason: parts.join(", "), caveat };
}
