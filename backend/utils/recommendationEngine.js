/**
 * Rule-Based Personalized Recommendation Engine (Phase 1)
 *
 * Evaluates:
 * 1. Employee Profile & Cadre Roles
 * 2. Calculated Skill Gaps (High / Medium / Low)
 * 3. Available iGOT Courses & NSSTA Programs
 *
 * Scoring Rules:
 *   MatchScore = (CompetencyGapWeight * 40) + (RoleRelevance * 30) + (DifficultyMatch * 20) + (RatingWeight * 10)
 *
 * In Phase 2: This will be upgraded with AI/RAG embedding cosine similarity.
 */

export const generateRecommendations = (user, skillGaps = [], courses = [], trainingPrograms = []) => {
  const recommendations = [];

  // 1. Process courses matching skill gaps
  skillGaps.forEach(gap => {
    if (gap.gap === 0) return;

    // Find direct course match
    const matchingCourses = courses.filter(
      c => c.competency?.toLowerCase().includes(gap.competency.toLowerCase()) ||
           gap.competency.toLowerCase().includes(c.competency?.toLowerCase()) ||
           c.domain?.toLowerCase() === gap.domain?.toLowerCase()
    );

    matchingCourses.forEach(course => {
      let score = 70;
      if (gap.priority === 'High') score += 20;
      else if (gap.priority === 'Medium') score += 10;

      if (course.rating && course.rating >= 4.8) score += 6;

      const reason = `Recommended because your current ${gap.competency} competency is Level ${gap.currentLevel} while your ${user.designation || 'Statistical'} role requires Level ${gap.targetLevel}.`;

      recommendations.push({
        id: `rec-${course.id}`,
        type: "iGOT Course",
        courseId: course.id,
        title: course.title,
        provider: course.provider,
        domain: course.domain,
        competency: gap.competency,
        difficulty: course.difficulty || course.level,
        duration: course.duration,
        matchScore: Math.min(99, score),
        priority: gap.priority,
        recommendationReason: reason,
        bannerBg: course.bannerBg,
        bannerBadge: course.bannerBadge
      });
    });

    // Find matching NSSTA residential programs
    const matchingPrograms = trainingPrograms.filter(
      p => p.competency?.toLowerCase().includes(gap.competency.toLowerCase()) ||
           p.domain?.toLowerCase() === gap.domain?.toLowerCase()
    );

    matchingPrograms.forEach(prog => {
      recommendations.push({
        id: `rec-${prog.programId}`,
        type: "NSSTA Program",
        programId: prog.programId,
        title: prog.title,
        provider: "NSSTA Greater Noida",
        domain: prog.domain,
        competency: gap.competency,
        duration: prog.duration,
        matchScore: gap.priority === 'High' ? 96 : 88,
        priority: gap.priority,
        recommendationReason: `High-impact NSSTA cadre workshop recommended to close ${gap.competency} gap before next ACBP review milestone.`,
        venue: prog.venue,
        startDate: prog.startDate
      });
    });
  });

  // Deduplicate and sort by matchScore
  const uniqueRecs = [];
  const seenIds = new Set();
  for (const item of recommendations) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueRecs.push(item);
    }
  }

  return uniqueRecs.sort((a, b) => b.matchScore - a.matchScore);
};
