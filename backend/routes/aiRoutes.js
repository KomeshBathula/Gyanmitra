import express from 'express';

const router = express.Router();

const mockQuestions = (documentName = "NSS_Sampling_Guidelines.pdf") => [
  {
    id: 1,
    question: `Based on Section 2 of ${documentName}: What is the primary purpose of selecting First Stage Units with PPSWR in NSS Surveys?`,
    options: [
      "To equalize sample weights among all rural blocks.",
      "To give larger population clusters a proportionally higher inclusion probability, minimizing overall survey variance.",
      "To eliminate the need for Second Stage Unit (SSU) listing.",
      "To standardize interview questionnaire length."
    ],
    correctAnswer: 1,
    explanation: "PPSWR sampling ensures unit inclusion probability matches population weight, ensuring unbiased estimations for village aggregates.",
    sourceCitation: `${documentName} (Page 18, Para 2.4)`
  },
  {
    id: 2,
    question: `According to the calculation guidelines in ${documentName}: How is casualty multiplier adjustment applied when households cannot be surveyed?`,
    options: [
      "The sample district is removed from the estimation frame.",
      "A casualty factor (Allocated SSUs / Surveyed SSUs) is applied to the sample multiplier.",
      "The missing sample is replaced without official notice.",
      "All weights are uniformly incremented by 1%."
    ],
    correctAnswer: 1,
    explanation: "Casualty adjustment maintains unbiased population aggregate estimates during non-response.",
    sourceCitation: `${documentName} (Page 42, Formula 5.3)`
  },
  {
    id: 3,
    question: `Under the National Accounts GDP Framework: Which approach is integrated with MCA-21 corporate financial filings?`,
    options: [
      "Expenditure Approach via Household Budget Surveys",
      "Production Approach (GVA) via Enterprise Balance Sheets",
      "Income Approach via Direct Tax Filings only",
      "Fixed Capital Formation Deflator Method"
    ],
    correctAnswer: 1,
    explanation: "MCA-21 integration compiles GVA by aggregating corporate value added from registered enterprise financial statements.",
    sourceCitation: "National Accounts Statistics Compilation Manual (Chapter 4, Para 4.2)"
  }
];

const handleGenerateQuiz = (req, res) => {
  const { documentName = "NSS_Sampling_Guidelines.pdf", difficulty = "Medium" } = req.body;
  const questions = mockQuestions(documentName);

  return res.json({
    success: true,
    mode: "mock",
    document: documentName,
    difficulty,
    totalQuestions: questions.length,
    questions
  });
};

const handleChat = (req, res) => {
  const { message } = req.body;
  let reply = "GyanMitra Statistical RAG: I have referenced MoSPI guidelines and NSSTA manuals to assist your inquiry.";
  let sources = ["MoSPI ACBP Framework 2026", "NSSTA Training Manual"];

  const msg = (message || '').toLowerCase();
  if (msg.includes("gap") || msg.includes("python") || msg.includes("skill")) {
    reply = "Your primary skill gap is in Python for Data Analysis (Level 2 vs Level 4 required for official microdata processing). I recommend completing the NSSTA 'Python for Microdata' module.";
    sources = ["MoSPI ACBP Competency Matrix 2026"];
  } else if (msg.includes("sampling") || msg.includes("nss") || msg.includes("fsu")) {
    reply = "In National Sample Surveys, Multi-Stage Stratified Sampling selects Census villages (FSUs) via PPSWR in Stage 1, followed by systematic household selection (SSUs) in Stage 2.";
    sources = ["NSS 79th Round Sampling Methodology Manual"];
  } else if (msg.includes("apar") || msg.includes("cbp") || msg.includes("karmayogi")) {
    reply = "Your APAR-linked CBP courses are aligned with DoPT guidelines. Completing courses on iGOT Bharat earns verified Karma Points towards your official annual performance appraisal.";
    sources = ["DoPT Karmayogi Bharat Guidelines 2026"];
  }

  return res.json({
    success: true,
    mode: "mock",
    reply,
    groundedSource: sources.join(" • ")
  });
};

// Route definitions supporting both paths
router.post('/generate-quiz', handleGenerateQuiz);
router.post('/quiz/generate', handleGenerateQuiz);
router.post('/assistant-chat', handleChat);
router.post('/chat', handleChat);

export default router;

