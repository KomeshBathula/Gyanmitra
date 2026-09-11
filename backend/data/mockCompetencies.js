/**
 * Official Competency Framework based on MoSPI Annual Capacity Building Plan (ACBP)
 * Domains: Statistical, Technical, Digital Governance, Behavioural
 * Levels: 1=Beginner, 2=Basic, 3=Intermediate, 4=Advanced, 5=Expert
 */

export const mockCompetencies = [
  // 1. Statistical Domain
  {
    id: "stat-1",
    name: "Survey Design & Sampling",
    domain: "Statistical",
    description: "Designing sampling frames, multi-stage stratification, PPSWR village selection, and circular systematic household selection.",
    currentLevel: 2,
    targetLevel: 4,
    importance: 5,
    roleRelevance: 0.95
  },
  {
    id: "stat-2",
    name: "National Accounts & GDP Compilation",
    domain: "Statistical",
    description: "Compiling Gross Value Added (GVA), Gross Fixed Capital Formation (GFCF), and integrating MCA-21 database with SNA 2008 standards.",
    currentLevel: 3,
    targetLevel: 4,
    importance: 4,
    roleRelevance: 0.85
  },
  {
    id: "stat-3",
    name: "Price Statistics (CPI, IIP, WPI)",
    domain: "Statistical",
    description: "Item basket weighting, geometric mean price relative computation, and high-frequency macroeconomic indicator estimation.",
    currentLevel: 3,
    targetLevel: 3,
    importance: 4,
    roleRelevance: 0.80
  },
  {
    id: "stat-4",
    name: "SDG Indicators & Data Quality Framework",
    domain: "Statistical",
    description: "Monitoring National Indicator Framework (NIF) for Sustainable Development Goals, UN Fundamental Principles of Official Statistics.",
    currentLevel: 3,
    targetLevel: 4,
    importance: 3,
    roleRelevance: 0.75
  },

  // 2. Technical Domain
  {
    id: "tech-1",
    name: "Python for Data Analysis",
    domain: "Technical",
    description: "Vectorized data processing with Pandas and NumPy, automated error checking, and microdata transformation scripts.",
    currentLevel: 2,
    targetLevel: 4,
    importance: 5,
    roleRelevance: 0.90
  },
  {
    id: "tech-2",
    name: "AI & Machine Learning in Statistics",
    domain: "Technical",
    description: "Automated outlier detection, machine learning imputation for non-response, and NLP categorization of industrial classification codes (NIC).",
    currentLevel: 1,
    targetLevel: 3,
    importance: 4,
    roleRelevance: 0.85
  },
  {
    id: "tech-3",
    name: "Data Visualization & Executive BI",
    domain: "Technical",
    description: "Interactive statistical dashboard development, chart narrative design, and automated report generation for Cabinet briefings.",
    currentLevel: 2,
    targetLevel: 3,
    importance: 4,
    roleRelevance: 0.80
  },
  {
    id: "tech-4",
    name: "GIS & Spatial Analytics",
    domain: "Technical",
    description: "Geocoding village enumeration blocks, GIS thematic mapping of Census data, and spatial cluster analysis.",
    currentLevel: 2,
    targetLevel: 3,
    importance: 3,
    roleRelevance: 0.70
  },

  // 3. Digital Governance Domain
  {
    id: "gov-1",
    name: "DPDP Act 2023 & Data Privacy",
    domain: "Digital Governance",
    description: "Anonymization techniques, k-anonymity for public microdata, citizen consent architecture, and lawful government data sharing.",
    currentLevel: 2,
    targetLevel: 3,
    importance: 4,
    roleRelevance: 0.85
  },
  {
    id: "gov-2",
    name: "Cybersecurity & Gov Cloud Best Practices",
    domain: "Digital Governance",
    description: "CERT-In guidelines, MeghRaj cloud security compliance, two-factor authentication, and safe data transmission protocols.",
    currentLevel: 3,
    targetLevel: 3,
    importance: 4,
    roleRelevance: 0.75
  },

  // 4. Behavioural & Managerial Domain
  {
    id: "mgmt-1",
    name: "Official Integrity & Public Ethics",
    domain: "Behavioural",
    description: "Adherence to CCS Conduct Rules 1964, transparency in statistical dissemination, and conflict of interest avoidance.",
    currentLevel: 4,
    targetLevel: 4,
    importance: 5,
    roleRelevance: 1.00
  },
  {
    id: "mgmt-2",
    name: "Citizen Communication & Public Grievances",
    domain: "Behavioural",
    description: "Citizen-centric public delivery, CPGRAMS grievance tracking, and clear statistical communication to non-technical stakeholders.",
    currentLevel: 3,
    targetLevel: 4,
    importance: 4,
    roleRelevance: 0.80
  }
];

export const mockCompetencyOverview = {
  overallScore: 68,
  monthlyDelta: "+8%",
  categories: [
    { id: "stat", name: "Statistical Competencies", score: 82, target: 85, count: 8 },
    { id: "tech", name: "Technical & Coding Competencies", score: 61, target: 80, count: 6 },
    { id: "gov", name: "Digital Governance & Data Privacy", score: 74, target: 75, count: 5 },
    { id: "mgmt", name: "Behavioural & Statistical Leadership", score: 78, target: 80, count: 4 }
  ]
};
