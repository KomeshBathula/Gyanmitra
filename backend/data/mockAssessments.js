/**
 * Official Role-Aligned Assessments & Question Bank
 * Note: Prototype assessment in Phase 1 (No strict proctoring)
 */

export const mockAssessments = [
  {
    id: "asm-101",
    title: "Official Statistics & Survey Sampling Assessment",
    domain: "Statistical",
    targetRole: "Statistical Officer / Deputy Director",
    durationMinutes: 20,
    totalQuestions: 5,
    passingScorePercentage: 70,
    karmaPointsReward: 100,
    description: "Evaluates multi-stage stratified sampling, multiplier calculations, and CAPI survey validation rules aligned with MoSPI guidelines.",
    questions: [
      {
        id: 1,
        question: "In NSS Multi-Stage Stratified Sampling, how are First Stage Units (FSUs) typically selected in rural sectors?",
        options: [
          "Simple Random Sampling without Replacement (SRSWOR)",
          "Probability Proportional to Size with Replacement (PPSWR) based on Census population",
          "Systematic Sampling based on alphabetical village list",
          "Judgmental quota selection by Field Investigators"
        ],
        correctAnswer: 1,
        competency: "Survey Design & Sampling",
        domain: "Statistical",
        difficulty: "Intermediate",
        explanation: "PPSWR ensures larger population villages have proportional inclusion probabilities to minimize national aggregate variance.",
        source: "MoSPI NSS Survey Design Manual (Chapter 2, Para 2.4)"
      },
      {
        id: 2,
        question: "What is the primary function of the sample multiplier in survey estimation?",
        options: [
          "To estimate the non-response rate in the district",
          "To inflate sample unit values to represent the entire target population domain",
          "To calculate surveyor field travel allowances",
          "To standardize questionnaire response duration"
        ],
        correctAnswer: 1,
        competency: "Survey Design & Sampling",
        domain: "Statistical",
        difficulty: "Intermediate",
        explanation: "The multiplier is the inverse of the inclusion probability, scaling sample observations up to population universe totals.",
        source: "NSSTA Sampling Methodology Guide (Page 31)"
      },
      {
        id: 3,
        question: "Under the SNA 2008 framework, which database is integrated for corporate GVA compilation in National Accounts?",
        options: [
          "MCA-21 Annual Financial Return database",
          "Direct Tax Assessment Register only",
          "District Industrial Center registration logs",
          "Customs import bills of entry only"
        ],
        correctAnswer: 0,
        competency: "National Accounts & GDP Compilation",
        domain: "Statistical",
        difficulty: "Advanced",
        explanation: "MCA-21 corporate electronic balance sheets provide enterprise-level Value Added for the organized private corporate sector.",
        source: "National Accounts Statistics Compilation Methodology (Chapter 4)"
      },
      {
        id: 4,
        question: "Under the DPDP Act 2023, what is mandatory before releasing anonymized microdata to research institutions?",
        options: [
          "Removing direct identifiers and verifying k-anonymity / l-diversity thresholds",
          "Publishing the complete names and Aadhaar numbers in a public gazette",
          "Charging an upfront commercial license fee",
          "Obtaining physical signatures from all sampled respondents"
        ],
        correctAnswer: 0,
        competency: "DPDP Act 2023 & Data Privacy",
        domain: "Digital Governance",
        difficulty: "Intermediate",
        explanation: "Statistical disclosure control mandates de-identification and privacy perturbation to prevent re-identification attacks.",
        source: "DPDP Act 2023 & MoSPI Microdata Dissemination Policy"
      },
      {
        id: 5,
        question: "According to CCS (Conduct) Rules 1964, what must a government servant do if a close relative accepts employment in a firm with official dealings?",
        options: [
          "Keep it confidential without notifying superiors",
          "Report the matter to the prescribed authority and seek appropriate recusal",
          "Immediately resign from public service",
          "Demand a personal fee from the commercial firm"
        ],
        correctAnswer: 1,
        competency: "Official Integrity & Public Ethics",
        domain: "Behavioural",
        difficulty: "Beginner",
        explanation: "Rule 4 of CCS (Conduct) Rules 1964 mandates disclosure of familial employment in private firms dealing with the officer's department.",
        source: "CCS (Conduct) Rules 1964 (Rule 4)"
      }
    ]
  },
  {
    id: "asm-102",
    title: "Python for Official Data & Vectorization Assessment",
    domain: "Technical",
    targetRole: "All Statistical Cadres",
    durationMinutes: 15,
    totalQuestions: 4,
    passingScorePercentage: 75,
    karmaPointsReward: 120,
    description: "Evaluates Pandas, NumPy, text parsing, and automated data quality checks for official survey microdata.",
    questions: [
      {
        id: 1,
        question: "Which Pandas method is recommended to vectorize condition-based column assignments across millions of survey records?",
        options: [
          "for loop iteration using df.iterrows()",
          "numpy.where() or numpy.select() vectorized expressions",
          "Python eval() inside a while loop",
          "Exporting to CSV and re-reading line by line"
        ],
        correctAnswer: 1,
        competency: "Python for Data Analysis",
        domain: "Technical",
        difficulty: "Intermediate",
        explanation: "np.where() runs in compiled C-speed, orders of magnitude faster than iterating with iterrows().",
        source: "NSSTA Python for Microdata Handbook"
      },
      {
        id: 2,
        question: "When computing weighted survey averages in Pandas, what is the correct formulation?",
        options: [
          "df['income'].mean()",
          "(df['income'] * df['weight']).sum() / df['weight'].sum()",
          "df['income'].sum() / len(df)",
          "df['weight'].mean() * df['income'].median()"
        ],
        correctAnswer: 1,
        competency: "Python for Data Analysis",
        domain: "Technical",
        difficulty: "Intermediate",
        explanation: "Weighted average requires multiplying each value by its sample weight and dividing by total sample weights.",
        source: "NSS Tabulation Guidelines"
      }
    ]
  }
];
