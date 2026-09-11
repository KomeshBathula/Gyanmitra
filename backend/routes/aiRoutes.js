import express from 'express';

const router = express.Router();

// POST /api/ai/generate-quiz
router.post('/generate-quiz', (req, res) => {
  const { documentName = "Sampling_Manual.pdf", questionCount = 5, difficulty = "Medium" } = req.body;

  const generatedQuestions = [
    {
      id: 1,
      question: `Based on Section 2 of ${documentName}: What is the primary purpose of selecting First Stage Units with PPSWR?`,
      options: [
        "To equalize sample weights among all rural blocks.",
        "To give larger population clusters a proportionally higher inclusion probability, minimizing overall variance.",
        "To eliminate the need for Second Stage Unit listing.",
        "To standardize questionnaire length."
      ],
      correctAnswer: 1,
      explanation: "PPSWR sampling ensures unit inclusion probability matches population weight.",
      sourceCitation: `${documentName} (Page 18, Para 2.4)`
    },
    {
      id: 2,
      question: `According to the calculation guidelines in ${documentName}: How is casualty multiplier adjustment applied?`,
      options: [
        "The sample district is removed from the estimation frame.",
        "A casualty factor (Allocated SSUs / Surveyed SSUs) is applied to the sample multiplier.",
        "The missing sample is replaced without notice.",
        "All weights are uniformly incremented by 1%."
      ],
      correctAnswer: 1,
      explanation: "Casualty adjustment maintains unbiased population aggregate estimates.",
      sourceCitation: `${documentName} (Page 42, Formula 5.3)`
    }
  ];

  res.json({
    success: true,
    document: documentName,
    difficulty,
    totalQuestions: generatedQuestions.length,
    questions: generatedQuestions
  });
});

// POST /api/ai/assistant-chat
router.post('/assistant-chat', (req, res) => {
  const { message } = req.body;
  let reply = "GyanMitra Statistical RAG: I have referenced MoSPI guidelines and NSSTA manuals to assist your inquiry.";

  if (message.toLowerCase().includes("gap") || message.toLowerCase().includes("python")) {
    reply = "Your primary skill gap is in Python for Data Analysis (Level 2 vs Level 4 required for ISS Deputy Director). I recommend completing the NSSTA 'Python for Microdata' module.";
  } else if (message.toLowerCase().includes("sampling")) {
    reply = "In National Sample Surveys, Multi-Stage Stratified Sampling selects Census villages (FSUs) via PPSWR in Stage 1, followed by systematic household selection (SSUs) in Stage 2.";
  }

  res.json({
    success: true,
    reply,
    groundedSource: "NSSTA Survey Sampling Manual & MoSPI ACBP Framework 2026"
  });
});

export default router;
