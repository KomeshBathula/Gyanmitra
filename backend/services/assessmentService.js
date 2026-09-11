import { db } from '../data/db.js';
import { competencyService } from './competencyService.js';
import { skillGapService } from './skillGapService.js';
import { recommendationService } from './recommendationService.js';

export const assessmentService = {
  getAssessments: async () => {
    return db.assessments.map(({ questions, ...metadata }) => ({
      ...metadata,
      questionCount: questions.length
    }));
  },

  getAssessmentById: async (id) => {
    if (!id) return null;
    const cleanId = String(id).toLowerCase().replace(/[-_]/g, '');
    const asm = db.assessments.find(a => {
      const match1 = a.id && String(a.id).toLowerCase().replace(/[-_]/g, '') === cleanId;
      const match2 = a._id && String(a._id).toLowerCase().replace(/[-_]/g, '') === cleanId;
      return match1 || match2;
    });
    if (asm) return asm;

    const numMatch = String(id).match(/\d+/);
    if (numMatch) {
      const idx = parseInt(numMatch[0], 10) - 1;
      if (idx >= 0 && idx < db.assessments.length) {
        return db.assessments[idx];
      }
      return db.assessments[0];
    }
    return db.assessments[0] || null;
  },

  startAssessment: async (assessmentId, userId) => {
    const asm = await assessmentService.getAssessmentById(assessmentId);
    if (!asm) return null;

    return {
      sessionId: `SES-${Date.now()}`,
      assessmentId: asm.id,
      title: asm.title,
      domain: asm.domain,
      durationMinutes: asm.durationMinutes,
      startedAt: new Date().toISOString(),
      questions: asm.questions.map(({ correctAnswer, explanation, ...q }) => q)
    };
  },

  submitAssessment: async (assessmentId, { answers = {}, durationSeconds = 0 }, userId = "usr_001") => {
    const asm = await assessmentService.getAssessmentById(assessmentId);
    if (!asm) return null;

    let correctCount = 0;
    const reviewList = asm.questions.map((q, idx) => {
      // Find answer by q.id, index, or q_001 pattern
      let selectedIndex = answers[q.id];
      if (selectedIndex === undefined) selectedIndex = answers[idx + 1];
      if (selectedIndex === undefined) selectedIndex = answers[`q_00${idx + 1}`];
      if (selectedIndex === undefined) selectedIndex = answers[`q_${idx + 1}`];

      const isCorrect = selectedIndex === q.correctAnswer;
      if (isCorrect) correctCount += 1;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedAnswer: selectedIndex,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        source: q.source,
        competency: q.competency
      };
    });

    const scorePercentage = Math.round((correctCount / asm.questions.length) * 100);
    const isPassed = scorePercentage >= (asm.passingScorePercentage || 70);

    const resultRecord = {
      resultId: `RES-${Date.now()}`,
      assessmentId: asm.id,
      userId,
      title: asm.title,
      domain: asm.domain,
      scorePercentage,
      scorePercent: scorePercentage,
      correctCount,
      totalQuestions: asm.questions.length,
      isPassed,
      karmaPointsEarned: isPassed ? asm.karmaPointsReward : 20,
      submittedAt: new Date().toISOString(),
      review: reviewList
    };

    db.assessmentResults.push(resultRecord);

    // CLOSED-LOOP TRIGGER: Update Competencies, Recalculate Gaps, Re-rank Recommendations
    const competencyImpacted = asm.questions[0]?.competency || "Survey Design & Sampling";
    await competencyService.updateFromAssessmentResult(userId, {
      scorePercentage,
      competencyImpacted,
      assessmentDomain: asm.domain
    });

    const updatedSkillGaps = await skillGapService.getUserSkillGaps(userId);
    const updatedRecommendations = await recommendationService.getPersonalizedRecommendations(userId);

    return {
      result: resultRecord,
      scorePercent: scorePercentage,
      scorePercentage,
      isPassed,
      ledgerUpdated: true,
      updatedSkillGaps,
      freshRecommendations: updatedRecommendations,
      closedLoopUpdates: {
        competencyLedgerUpdated: true,
        updatedGapsCount: updatedSkillGaps.length,
        topRecommendations: updatedRecommendations.slice(0, 3)
      }
    };
  }
};
