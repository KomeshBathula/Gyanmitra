/**
 * Rule-Based Skill Gap Calculator (Phase 1 Deterministic Engine)
 *
 * Formula:
 *   skillGap = targetLevel - currentLevel
 *
 * Gap Classification:
 *   0  -> "No Gap"
 *   1  -> "Low"
 *   2  -> "Medium"
 *   3+ -> "High"
 *
 * Priority Score:
 *   priorityScore = Math.max(0, gap) * importance * (roleRelevance || 1.0)
 *
 * In Phase 2: This module will be augmented with AI/ML competency vectors and historical cadre baseline models.
 */

export const calculateSkillGaps = (userCompetencies = [], coursesCatalog = []) => {
  return userCompetencies.map((comp, index) => {
    const current = comp.currentLevel || 1;
    const target = comp.targetLevel || 3;
    const gap = Math.max(0, target - current);
    const importance = comp.importance || 3;
    const relevance = comp.roleRelevance || 0.8;

    const priorityScore = gap * importance * relevance;

    let priorityLabel = "No Gap";
    if (gap >= 2 || priorityScore >= 6) {
      priorityLabel = "High";
    } else if (gap === 1 || priorityScore >= 3) {
      priorityLabel = "Medium";
    } else if (gap === 0) {
      priorityLabel = "Completed";
    }

    // Find recommended course for this competency
    const matchedCourse = coursesCatalog.find(
      c => c.competency?.toLowerCase().includes(comp.name.toLowerCase()) ||
           comp.name.toLowerCase().includes(c.competency?.toLowerCase())
    ) || coursesCatalog[index % coursesCatalog.length];

    const provider = matchedCourse?.provider || "iGOT Karmayogi / NSSTA";

    const explanation = gap > 0
      ? `Demonstrated competency in ${comp.name} is Level ${current}, while official role benchmark mandates Level ${target} for statistical operations.`
      : `Demonstrated competency in ${comp.name} satisfies official benchmark Level ${target}.`;

    return {
      id: `gap-${comp.id || index + 1}`,
      competencyId: comp.id,
      competency: comp.name,
      domain: comp.domain || "Statistical",
      currentLevel: current,
      targetLevel: target,
      gap,
      gapSeverity: priorityLabel,
      severity: priorityLabel,
      priority: priorityLabel,
      priorityScore: Number(priorityScore.toFixed(2)),
      why: explanation,
      explanation,
      recommendedCourse: matchedCourse?.title || `Advanced ${comp.name}`,
      provider: provider
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
};
