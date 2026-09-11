import { config } from '../config/config.js';

/**
 * Service for Groq Cloud API LLM Integration
 * Provides real AI generation for assessments, quizzes, and RAG grounding
 * with graceful fallback to MoSPI statistical templates if API key is not configured.
 */
export const groqService = {
  /**
   * Generate assessment questions from document context or statistical topic
   */
  generateQuizQuestions: async ({
    documentName = "NSS_Sampling_Guidelines.pdf",
    documentText = "",
    topic = "Official Statistics & Survey Sampling",
    questionCount = 5,
    difficulty = "Medium",
    questionType = "MCQ"
  }) => {
    const apiKey = config.groqApiKey || process.env.GROQ_API_KEY;

    // If Groq API Key is configured, make real call to Groq LLM
    if (apiKey && apiKey.trim() !== '') {
      try {
        const prompt = `You are an expert psychometrician and senior statistical officer creating a certified capacity assessment for Government of India (MoSPI & NSSTA) statistical personnel.

Source Material / Document: "${documentName}"
Topic Domain: "${topic}"
Difficulty Level: "${difficulty}"
Question Format: "${questionType}"
Total Questions to Generate: ${questionCount}

${documentText ? `Document Excerpt/Context:\n"""\n${documentText.slice(0, 4000)}\n"""\n` : ''}

Generate exactly ${questionCount} high-quality, technically accurate multiple-choice questions aligned with MoSPI, National Accounts, NSS Survey Sampling, and Indian Official Statistics.

Respond strictly in valid JSON format with this exact structure:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text"
      ],
      "correctAnswer": 0,
      "explanation": "Clear official rationale explaining why the correct answer is valid.",
      "sourceCitation": "Specific citation (e.g., ${documentName}, Section 2.4 / MoSPI Manual)"
    }
  ]
}
Important: "correctAnswer" MUST be an integer 0, 1, 2, or 3 representing the zero-based index of the correct option in the "options" array.`;

        const modelsToTry = [config.groqModel || 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];
        for (const model of modelsToTry) {
          try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.trim()}`
              },
              body: JSON.stringify({
                model,
                messages: [
                  {
                    role: 'system',
                    content: 'You are a professional MoSPI / NSSTA assessment generator. You must respond only with a valid JSON object matching the requested schema.'
                  },
                  {
                    role: 'user',
                    content: prompt
                  }
                ],
                response_format: { type: 'json_object' },
                temperature: 0.2,
                max_tokens: 700
              })
            });

            if (response.ok) {
              const data = await response.json();
              const content = data.choices?.[0]?.message?.content;
              if (content) {
                const parsed = JSON.parse(content);
                if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
                  return {
                    mode: "groq-ai",
                    model,
                    questions: parsed.questions.map((q, idx) => ({
                      id: q.id || (idx + 1),
                      question: q.question,
                      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : [
                        q.options?.[0] || "Option A",
                        q.options?.[1] || "Option B",
                        q.options?.[2] || "Option C",
                        q.options?.[3] || "Option D"
                      ],
                      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
                      explanation: q.explanation || "Official MoSPI methodology rationale.",
                      sourceCitation: q.sourceCitation || `${documentName} (Section 2)`
                    }))
                  };
                }
              }
            } else {
              const errText = await response.text();
              console.warn(`[Groq API] Model ${model} HTTP ${response.status} Error:`, errText);
            }
          } catch (mErr) {
            console.warn(`[Groq API] Quiz generation attempt on ${model} failed:`, mErr.message);
          }
        }
      } catch (err) {
        console.warn("[Groq API] Generation exception:", err.message);
      }
    }

    // Fallback template generator when API key is missing or on network limitation
    return {
      mode: "mock",
      questions: groqService.getTemplateQuestions(documentName, questionCount, difficulty)
    };
  },

  /**
   * AI Assistant Chat powered exclusively by Groq LLM with strict domain guardrails
   */
  chatAssistant: async ({ message, chatHistory = [], userCadre = "Statistical Officer" }) => {
    const FORMAL_REFUSAL_MESSAGE = "I am GyanMitra AI, dedicated exclusively to the iGOT Karmayogi & MoSPI Capacity Building Framework. I can only assist with official competencies, courses, assessment preparation, and learning pathways within this application. Please submit inquiries regarding official statistics, your competency profile, or portal courses.";

    const apiKey = config.groqApiKey || process.env.GROQ_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      try {
        const systemPrompt = `You are GyanMitra AI, the official AI Learning and Competency Assistant for the GyanMitra portal (iGOT Karmayogi & MoSPI Capacity Building Framework, Government of India).
CRITICAL DIRECTIVE - STRICT DOMAIN BOUNDARY:
You are strictly confined to answering questions concerning:
1. The GyanMitra application, its features, workflows, and modules (competency matrix, skill gap analysis, personalized learning pathways, course assessments, department admin quizzes, APAR compliance, and Karma Points).
2. iGOT Karmayogi civil service capacity building framework, Mission Karmayogi, DoPT guidelines.
3. Official statistics, MoSPI, NSSTA curricula, survey sampling methodology (NSS, PLFS, HCES, ASI, CPI, GDP/GVA compilation), and statistical data processing courses (such as Python for Microdata, R for Official Statistics, Data Governance).
4. Courses offered or recommended on this portal.
User cadre: ${userCadre}.

REFUSAL POLICY:
If the user's question is NOT directly related to the GyanMitra application, iGOT Karmayogi, civil service competency building, MoSPI statistical frameworks, or related courses (for example, general trivia, entertainment, recipes, general coding unrelated to the curriculum, personal advice, politics, gaming, sports, or casual chit-chat outside this scope), you MUST REFUSE politely and formally.
Respond with this exact formal institutional message:
"${FORMAL_REFUSAL_MESSAGE}"

DO NOT answer off-topic queries under any circumstances, even if requested or hypothesized. For on-topic queries, provide clear, authoritative, and helpful guidance grounded in official Indian Government training frameworks. Keep response under 300 words.`;

        const messages = [
          { role: 'system', content: systemPrompt },
          ...(Array.isArray(chatHistory) ? chatHistory.slice(-4) : []),
          { role: 'user', content: message }
        ];

        // Try primary model, fallback to alternate Groq model if rate limited
        const modelsToTry = [config.groqModel || 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];
        let reply = null;
        let usedModel = modelsToTry[0];

        for (const model of modelsToTry) {
          try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.trim()}`
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.2,
                max_tokens: 450
              })
            });

            if (response.ok) {
              const data = await response.json();
              reply = data.choices?.[0]?.message?.content;
              if (reply) {
                usedModel = model;
                break;
              }
            } else {
              const errBody = await response.text();
              console.warn(`[Groq API] Model ${model} HTTP ${response.status}:`, errBody);
            }
          } catch (modelErr) {
            console.warn(`[Groq API] Attempt with ${model} failed:`, modelErr.message);
          }
        }

        if (reply) {
          return {
            mode: "groq-ai",
            model: usedModel,
            reply: reply.trim(),
            groundedSource: "MoSPI Official Frameworks & NSSTA Guidelines (Groq AI)"
          };
        }
      } catch (err) {
        console.warn("[Groq API] Chat exception:", err.message);
      }
    }

    // Fallback response when offline or network unreachable
    const msg = (message || '').toLowerCase();
    const isDomainRelevant = msg.includes("gap") || msg.includes("python") || msg.includes("skill") ||
      msg.includes("sampling") || msg.includes("nss") || msg.includes("fsu") || msg.includes("ssu") ||
      msg.includes("apar") || msg.includes("cbp") || msg.includes("karmayogi") || msg.includes("course") ||
      msg.includes("igot") || msg.includes("competency") || msg.includes("mospi") || msg.includes("nssta") ||
      msg.includes("assessment") || msg.includes("quiz") || msg.includes("gdp") || msg.includes("gva") ||
      msg.includes("cpi") || msg.includes("plfs") || msg.includes("hces") || msg.includes("dpdp") ||
      msg.includes("waterfall") || msg.includes("insolvency") || msg.includes("admin");

    if (!isDomainRelevant) {
      return {
        mode: "mock",
        reply: FORMAL_REFUSAL_MESSAGE,
        groundedSource: "MoSPI Official Capacity Building Guidelines"
      };
    }

    let reply = "GyanMitra Statistical Advisor: I have referenced official MoSPI guidelines and NSSTA manuals to assist your inquiry.";
    let sources = ["MoSPI ACBP Framework 2026", "NSSTA Training Manual"];

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

    return {
      mode: "mock",
      reply,
      groundedSource: sources.join(" • ")
    };
  },
  getTemplateQuestions: (documentName, count = 5, difficulty = "Medium") => {
    const templates = [
      {
        id: 1,
        question: `Based on Section 2 of ${documentName}: What is the primary statistical purpose of selecting First Stage Units (FSUs) with PPSWR in National Sample Surveys?`,
        options: [
          "To equalize sample weights uniformly across all rural census blocks.",
          "To give larger population clusters a proportionally higher inclusion probability, minimizing overall national survey variance.",
          "To eliminate the necessity for Second Stage Unit (SSU) household listing.",
          "To standardize interview questionnaire duration across states."
        ],
        correctAnswer: 1,
        explanation: "PPSWR sampling ensures unit inclusion probability matches census population weight, ensuring unbiased estimations for national aggregate indicators.",
        sourceCitation: `${documentName} (Chapter 2, Para 2.4.1)`
      },
      {
        id: 2,
        question: `Under the calculation procedures in ${documentName}: How is casualty multiplier adjustment computed when an allocated sample hamlet is physically inaccessible?`,
        options: [
          "The entire sample district is omitted from the state estimation frame.",
          "A casualty factor (Allocated SSUs / Surveyed SSUs) is multiplied into the base sample weight.",
          "The missing sample unit is arbitrarily substituted with a neighboring village without official audit.",
          "All state-level sampling weights are uniformly increased by 1.5%."
        ],
        correctAnswer: 1,
        explanation: "Casualty multiplier adjustments preserve unbiased population aggregates during unforeseen field non-response or natural accessibility constraints.",
        sourceCitation: `${documentName} (Chapter 5, Formula 5.3)`
      },
      {
        id: 3,
        question: `Under the National Accounts GDP/GVA Framework: Which dataset is integrated for compiling organized corporate sector Value Added?`,
        options: [
          "Household Consumer Expenditure Survey (HCES) quarterly logs",
          "Ministry of Corporate Affairs MCA-21 electronic financial filing balance sheets",
          "District Industries Centre (DIC) local shop registrations",
          "State Commercial Tax transit checkpost entries"
        ],
        correctAnswer: 1,
        explanation: "MCA-21 integration compiles GVA by aggregating audited enterprise-level corporate value additions across private corporate manufacturing and services.",
        sourceCitation: "National Accounts Statistics Compilation Methodology (Chapter 4, Para 4.2)"
      },
      {
        id: 4,
        question: `Under the Digital Personal Data Protection (DPDP) Act 2023: What protocol must be enforced prior to public microdata dissemination?`,
        options: [
          "Direct identifiers must be removed and statistical disclosure control (k-anonymity) verified.",
          "All survey records must be published in unmasked plaintext CSV format.",
          "Data dissemination is prohibited for all non-governmental academic institutions.",
          "Only raw unweighted responses may be shared."
        ],
        correctAnswer: 0,
        explanation: "Statistical Disclosure Control (SDC) ensures citizen privacy thresholds while allowing robust macroeconomic and demographic research.",
        sourceCitation: "DPDP Act 2023 & MoSPI Microdata Anonymization Protocols (Section 8)"
      },
      {
        id: 5,
        question: `In Computer-Assisted Personal Interviewing (CAPI) for MoSPI surveys, what is the primary role of automated validation rules?`,
        options: [
          "To flag ratio anomalies and logical inconsistencies at the point of household data capture.",
          "To automatically generate fake replacement responses when a respondent refuses.",
          "To bypass supervisor verification for speed.",
          "To restrict field investigators from entering numerical values."
        ],
        correctAnswer: 0,
        explanation: "CAPI automated range and consistency checks prevent illogical data entry in real-time, drastically reducing post-enumeration cleaning delays.",
        sourceCitation: "MoSPI CAPI Field Operations Quality Handbook (Page 14)"
      }
    ];

    return templates.slice(0, Math.min(count, templates.length));
  }
};
