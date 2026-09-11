import { mockCourses } from '../data/mockCourses.js';
import { mockCompetencies, mockCompetencyOverview } from '../data/mockCompetencies.js';
import { mockAssessments } from '../data/mockAssessments.js';
import { mockNotifications } from '../data/mockNotifications.js';

// Enhanced Cadre Employees matching frontend Admin & Learner directories
export const seedUsers = [
  // 1. Employee default
  {
    _id: "usr_001",
    name: "Rajesh Kumar",
    employeeId: "MOSPI-ISS-48921",
    designation: "Deputy Director (Statistical Methodology)",
    group: "Group A (Gazetted)",
    department: "Survey Design and Research Division (SDRD)",
    departmentId: "statistical",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "National Sample Survey Field Operations",
    cadre: "Indian Statistical Service (ISS)",
    location: "SDRD Kolkata, West Bengal",
    email: "rajesh.kumar@gov.in",
    phone: "+91 98101 23456",
    reportingOfficer: "Dr. Arvind Mehta (Additional Director General)",
    yearsOfExperience: 8,
    education: "M.Sc. in Statistics (ISI Kolkata)",
    roleResponsibilities: [
      "Survey design and multi-stage stratified cluster sampling for NSS 79th Round",
      "Microdata processing, validation and automated imputation pipelines",
      "Executive statistical reporting and National Accounts compilation"
    ],
    previousTraining: [
      "Advanced Survey Sampling & Estimation (NSSTA 2023)",
      "National Accounts Framework SNA 2008 (MoSPI 2024)"
    ],
    karmayogiCredits: 799,
    currentRank: "146th Rank",
    learningHours: "146h 34m",
    badgesEarned: 0,
    certificatesCount: 75,
    postsCount: 0,
    profileCompletion: 82.5,
    role: "EMPLOYEE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "ISS Cadre Deputy Director specializing in socio-economic surveys, Python microdata automation, and sampling methodologies.",
    aparStatus: "Compliant",
    activeCoursesCount: 4,
    competencies: [
      { id: "stat-1", name: "Survey Design & Sampling", currentLevel: 4, targetLevel: 4, importance: 4, roleRelevance: 1.0 },
      { id: "stat-2", name: "Field Data Validation (CAPI)", currentLevel: 3, targetLevel: 4, importance: 3, roleRelevance: 0.9 },
      { id: "tech-1", name: "Python for Data Analysis", currentLevel: 2, targetLevel: 4, importance: 4, roleRelevance: 1.0 },
      { id: "tech-2", name: "AI / Machine Learning in Statistics", currentLevel: 1, targetLevel: 3, importance: 3, roleRelevance: 0.8 },
      { id: "tech-3", name: "Data Visualization & Executive BI", currentLevel: 2, targetLevel: 3, importance: 2, roleRelevance: 0.7 },
      { id: "gov-1", name: "DPDP Act 2023 & Data Privacy", currentLevel: 2, targetLevel: 3, importance: 3, roleRelevance: 0.8 }
    ],
    completedCourses: ["crs-101", "crs-105"],
    currentCourses: ["ml-1", "ml-2", "ml-3", "ml-4"]
  },
  // 2. NSSTA Faculty Trainer
  {
    _id: "usr_trainer_meenakshi",
    name: "Dr. Meenakshi Sundaram",
    employeeId: "NSSTA-FAC-1002",
    designation: "Senior Faculty & Course Director (Statistical Sampling)",
    group: "Faculty Directorate",
    department: "National Statistical Systems Training Academy (NSSTA)",
    departmentId: "statistical",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "Capacity Building & Training Division",
    cadre: "National Training Cadre",
    location: "NSSTA Greater Noida, Uttar Pradesh",
    email: "dr.meenakshi@nssta.gov.in",
    phone: "+91 99200 44321",
    reportingOfficer: "Director General (NSSTA)",
    yearsOfExperience: 16,
    education: "Ph.D. in Mathematical Statistics, Delhi University",
    roleResponsibilities: [
      "Curriculum design for ISS probationers and in-service refresher batches",
      "MoSPI statistical competency assessment calibration",
      "Delivery of hands-on advanced sampling and econometric modules"
    ],
    karmayogiCredits: 1450,
    currentRank: "12th Rank",
    learningHours: "380h 10m",
    role: "TRAINER",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Senior Course Director at NSSTA training civil servants in Official Statistics, Survey Sampling, and Big Data Analytics.",
    aparStatus: "Exemplary",
    activeCoursesCount: 8
  },
  // 3. Cadre Admin: Civil Administration
  {
    _id: "usr_admin_civil",
    name: "Dr. Arvind Mehta, IAS",
    employeeId: "DOPT-IAS-0042",
    designation: "Joint Secretary & Cadre Director",
    group: "Apex Governance",
    department: "Department of Personnel & Training (DoPT)",
    departmentId: "civil",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    division: "Cadre Management & Capacity Building",
    cadre: "Indian Administrative Service (IAS / CSS)",
    location: "North Block, Central Secretariat, New Delhi",
    email: "admin.civil@dopt.gov.in",
    phone: "+91 11 2309 4001",
    reportingOfficer: "Secretary (Personnel)",
    yearsOfExperience: 22,
    education: "M.A. in Public Policy (Oxford / St. Stephen's)",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Cadre Administrator overseeing capacity building, competency diagnostics, and APAR compliance for Central Civil Services.",
    aparStatus: "Exemplary"
  },
  // 4. Cadre Admin: Municipal / ULB
  {
    _id: "usr_admin_municipal",
    name: "Smt. Kavitha Reddy",
    employeeId: "MOHUA-ULB-8812",
    designation: "Municipal Commissioner & Directorate Head",
    group: "Urban Local Bodies",
    department: "Directorate of Municipal Administration",
    departmentId: "municipal",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    division: "Urban Governance & Smart Cities",
    cadre: "Municipal Cadre & Urban Planners",
    location: "Nirman Bhawan, New Delhi / Hyderabad",
    email: "admin.municipal@mohua.gov.in",
    phone: "+91 40 2345 6789",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    bio: "Municipal Cadre Director leading urban capacity building, GIS planning, and ULB fiscal analytics.",
    aparStatus: "Exemplary"
  },
  // 5. Cadre Admin: MoSPI Statistical Cadre
  {
    _id: "usr_admin_statistical",
    name: "Shri Rameshwar Rao, ISS",
    employeeId: "MOSPI-ISS-0010",
    designation: "Chief Director General",
    group: "Apex Statistical",
    department: "National Statistical Office (NSO)",
    departmentId: "statistical",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "National Statistical System Governance",
    cadre: "Indian Statistical Service (ISS / SSS)",
    location: "Khurshid Lal Bhawan, Janpath, New Delhi",
    email: "admin.statistical@mospi.gov.in",
    phone: "+91 11 2338 2145",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Chief Director General of NSO administering statistical workforce competency benchmarking and official surveys.",
    aparStatus: "Exemplary"
  },
  // 6. Cadre Admin: Revenue & Finance
  {
    _id: "usr_admin_revenue",
    name: "Dr. S. K. Mukherjee, IRS",
    employeeId: "DOR-IRS-0055",
    designation: "Principal Secretary & Cadre Controlling Authority",
    group: "Revenue Administration",
    department: "Central Board of Direct & Indirect Taxes",
    departmentId: "revenue",
    ministry: "Ministry of Finance",
    division: "Revenue Intelligence & Tax Administration",
    cadre: "Indian Revenue Service (IRS / State Treasuries)",
    location: "North Block, New Delhi",
    email: "admin.revenue@finmin.gov.in",
    phone: "+91 11 2309 2567",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "Revenue Cadre Director overseeing fiscal analytics, GST audits, and tax officer competency calibration.",
    aparStatus: "Exemplary"
  },
  // 7. General Admin fallback
  {
    _id: "usr_admin_general",
    name: "Dr. Arvind Mehta",
    employeeId: "MOSPI-ADM-001",
    designation: "Additional Director General (Training & ACBP)",
    group: "Group A (Apex)",
    department: "Training Division & Capacity Building Unit",
    departmentId: "civil",
    ministry: "Ministry of Statistics & Programme Implementation",
    division: "Annual Capacity Building Plan (ACBP)",
    cadre: "National Statistical Cadre Management",
    location: "New Delhi",
    email: "admin.workforce@mospi.gov.in",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Workforce Administrator monitoring institutional competency compliance across all Government of India cadres.",
    aparStatus: "Exemplary"
  }
];

export const seedSkillGaps = [
  {
    _id: "gap-1",
    id: "gap-1",
    userId: "usr_rajesh",
    competencyId: "tech-1",
    competency: "Python for Data Analysis",
    category: "Technical",
    domain: "Technical",
    currentLevel: 2,
    targetLevel: 4,
    requiredLevel: 4,
    gap: 2,
    priority: "High",
    severity: "High",
    evidence: "Assessment score: 58% on pandas/numpy data transformation. Role requires Level 4 for National Sample Survey automated data validation.",
    why: "Your demonstrated competency in Python is Level 2 (Basic scripting), while the ISS Deputy Director role mandates Level 4 (Advanced ETL, vectorization, and survey microdata processing).",
    recommendedCourse: "Python for Official Statistics & Microdata Processing",
    provider: "NSSTA Greater Noida",
    status: "Identified"
  },
  {
    _id: "gap-2",
    id: "gap-2",
    userId: "usr_rajesh",
    competencyId: "tech-2",
    competency: "AI / Machine Learning in Statistics",
    category: "Technical",
    domain: "Technical",
    currentLevel: 1,
    targetLevel: 3,
    requiredLevel: 3,
    gap: 2,
    priority: "High",
    severity: "High",
    evidence: "Assessment score: 40% on predictive modeling and outlier detection. MoSPI 2026 AI Framework requires Level 3 for automated census anomaly detection.",
    why: "Demonstrated awareness level (Level 1). Modern statistical compilation mandates ML techniques for automated imputation and satellite data integration.",
    recommendedCourse: "Applied Machine Learning for National Accounts & Survey Imputation",
    provider: "iGOT Karmayogi",
    status: "Identified"
  },
  {
    _id: "gap-3",
    id: "gap-3",
    userId: "usr_rajesh",
    competencyId: "tech-3",
    competency: "Data Visualization & Executive BI",
    category: "Technical",
    domain: "Technical",
    currentLevel: 2,
    targetLevel: 3,
    requiredLevel: 3,
    gap: 1,
    priority: "Medium",
    severity: "Medium",
    evidence: "Assessment score: 68%. Ministry requires automated PowerBI / Open Source Dashboards for Cabinet Secretariat briefings.",
    why: "Good static chart knowledge, but interactive dashboard design for high-frequency indicators (CPI, IIP) requires Level 3 competency.",
    recommendedCourse: "Interactive Statistical Dashboards & Data Storytelling",
    provider: "NSSTA Greater Noida",
    status: "Identified"
  },
  {
    _id: "gap-4",
    id: "gap-4",
    userId: "usr_rajesh",
    competencyId: "gov-1",
    competency: "National Data Governance & DPDP Act 2023",
    category: "Digital Governance",
    domain: "Digital Governance",
    currentLevel: 2,
    targetLevel: 3,
    requiredLevel: 3,
    gap: 1,
    priority: "Medium",
    severity: "Medium",
    evidence: "Assessment score: 70%. Need advanced compliance training for anonymizing unit-level survey records under DPDP Act 2023.",
    why: "Mandatory MoSPI compliance for open-access microdata dissemination requires certified Level 3 privacy engineering skills.",
    recommendedCourse: "Data Anonymization and Privacy Compliance in Official Statistics",
    provider: "iGOT Karmayogi",
    status: "Identified"
  },
  {
    _id: "gap-5",
    id: "gap-5",
    userId: "usr_rajesh",
    competencyId: "stat-1",
    competency: "Survey Sampling & Multi-Stage Design",
    category: "Statistical",
    domain: "Statistical",
    currentLevel: 4,
    targetLevel: 4,
    requiredLevel: 4,
    gap: 0,
    priority: "Completed",
    severity: "Completed",
    evidence: "Assessment score: 94%. Demonstrated mastery in Stratified Multi-stage Cluster Sampling during NSS 79th Round.",
    why: "Fully aligned with cadre requirement. You have achieved full Level 4 benchmark.",
    recommendedCourse: "Advanced NSS Sampling Masterclass",
    provider: "NSSTA Aligned",
    status: "Satisfied"
  },
  {
    _id: "gap-6",
    id: "gap-6",
    userId: "usr_rajesh",
    competencyId: "stat-2",
    competency: "SQL & Enterprise Statistical Databases",
    category: "Technical",
    domain: "Technical",
    currentLevel: 3,
    targetLevel: 3,
    requiredLevel: 3,
    gap: 0,
    priority: "Completed",
    severity: "Completed",
    evidence: "Assessment score: 88%. Strong performance in multi-table relational joins, indexing, and PostgreSQL query optimization.",
    why: "Competency matches role benchmark. Recommended for mentoring junior statistical officers.",
    recommendedCourse: "Enterprise Postgres for Official Databases",
    provider: "iGOT Karmayogi",
    status: "Satisfied"
  }
];

export const seedLearningPathways = [
  {
    _id: "lp_001",
    id: "lp_001",
    userId: "usr_rajesh",
    cadreRole: "ISS Deputy Director Mandate",
    targetCompetency: "Python & Statistical Machine Learning for NSS Automation",
    totalSteps: 5,
    completedSteps: 2,
    estimatedTotalHours: "48 Hours",
    totalCredits: 120,
    steps: [
      {
        step: 1,
        title: "Python Foundations for Official Statistics",
        provider: "iGOT Karmayogi",
        duration: "8 Hours",
        credits: 20,
        status: "Completed",
        competencyGain: "Basic Vectorized Computations",
        targetLevel: 2,
        description: "Core syntax, NumPy array manipulation, and data structures."
      },
      {
        step: 2,
        title: "Pandas for National Survey Data Cleaning",
        provider: "NSSTA Greater Noida",
        duration: "12 Hours",
        credits: 30,
        status: "Completed",
        competencyGain: "Survey Microdata Transformation",
        targetLevel: 3,
        description: "Handling missing survey blocks, outlier clipping, and merging large multi-schedule tables."
      },
      {
        step: 3,
        title: "Automated Data Imputation & Anomaly Detection",
        provider: "iGOT Karmayogi",
        duration: "10 Hours",
        credits: 25,
        status: "In Progress",
        competencyGain: "Machine Learning Imputation",
        targetLevel: 4,
        description: "Applying k-NN and iterative regression imputations on NSS microdata."
      },
      {
        step: 4,
        title: "National Accounts & SUT Automated Estimation",
        provider: "NSSTA Greater Noida",
        duration: "10 Hours",
        credits: 25,
        status: "Locked",
        competencyGain: "National Accounts Compilation",
        targetLevel: 4,
        description: "Supply-Use Tables (SUT) double deflation and GDP deflator algorithms."
      },
      {
        step: 5,
        title: "Final Capstone: NSS Round Automated Validation Pipeline",
        provider: "MoSPI SDRD",
        duration: "8 Hours",
        credits: 20,
        status: "Locked",
        competencyGain: "Level 4 Certified Competency",
        targetLevel: 4,
        description: "End-to-end automated processing and CAPI data verification capstone project."
      }
    ]
  }
];

export const seedGeneratedQuizzes = [
  {
    _id: "quiz-gen-101",
    id: "quiz-gen-101",
    title: "AI Assessment: NSS 79th Round Sampling & Estimation Protocol",
    documentName: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
    topic: "Survey Sampling & Estimation",
    difficulty: "Medium",
    questionCount: 3,
    createdAt: "Today, 11:45 AM",
    createdBy: "Dr. Arvind Mehta (ADG, SDRD)",
    departmentId: "statistical",
    targetDepartment: "Survey Design and Research Division (SDRD)",
    targetUserId: "usr_001",
    targetUserName: "Rajesh Kumar",
    courseId: "ml-c-1",
    courseTitle: "Foundation Training on Python for Large Microdata",
    passingScorePercentage: 70,
    isLive: true,
    questions: [
      {
        id: 1,
        question: "According to Section 2.4 of the uploaded NSS 79th Round manual, what is the exact population threshold for forming an independent rural sub-stratum?",
        options: [
          "Villages with census population of 5,000 or more form an independent sub-stratum.",
          "Villages with census population of 10,000 or more are split into two sub-districts.",
          "Sub-stratification is solely decided at the discretion of the State DES Director.",
          "Only villages with 100% electrified households form Sub-stratum 1."
        ],
        correctAnswer: 0,
        explanation: "As specified in Section 2.4.1 (page 18): 'In rural sector, all large villages having population 5,000 or more as per Census 2011 shall form a separate sub-stratum to avoid sampling variance.'",
        sourceCitation: "Page 18, Para 2.4.1 (Sampling Methodology Manual)",
        relatedModule: "Module 1: Vectorized operations on multi-gigabyte survey files",
        moduleId: 1
      },
      {
        id: 2,
        question: "How does the manual mandate calculating the casualty multiplier adjustment when an allocated sample hamlet cannot be surveyed due to physical inaccessibility?",
        options: [
          "The entire district's survey results are invalidated.",
          "A casualty adjustment factor (Total allocated SSUs / Surveyed SSUs) is applied to the sample multiplier.",
          "The missing hamlet is arbitrarily substituted with a neighboring village without record.",
          "The weight of all other states in India is increased by 0.5%."
        ],
        correctAnswer: 1,
        explanation: "Para 3.12 (Casualty Handling): Sample weights are dynamically re-adjusted by the ratio of allocated over surveyed sampling units.",
        sourceCitation: "Page 34, Formula 3.12 (Casualty Multiplier Equation)",
        relatedModule: "Module 2: Handling complex survey weights & stratified multipliers",
        moduleId: 2
      },
      {
        id: 3,
        question: "Which official validation check must be passed before microdata records can be transmitted to the Central SDRD Server in Kolkata?",
        options: [
          "Zero duplicate household IDs within the same FSU sub-sample.",
          "Manual handwritten signature from the Gram Panchayat Sarpanch.",
          "Approval from the District Collector's personal assistant.",
          "Verification by a private third-party marketing agency."
        ],
        correctAnswer: 0,
        explanation: "Section 4.1.2: Uniqueness of FSU-Segment-Household combination is a hard automated primary key validation constraint.",
        sourceCitation: "Page 42, Para 4.1.2 (CAPI Data Integrity Protocol)",
        relatedModule: "Module 3: Automated consistency checks & outlier detection rules",
        moduleId: 3
      }
    ]
  },
  {
    _id: "quiz-course-cnt-1",
    id: "quiz-course-cnt-1",
    title: "Department Admin Certification Assessment: Corporate Insolvency Resolution",
    documentName: "IBC_2016_Regulatory_Framework_MoSPI_Guidance.pdf",
    topic: "Corporate Governance & Insolvency Law",
    difficulty: "Intermediate",
    questionCount: 3,
    createdAt: "Today",
    createdBy: "Shri S. K. Roy (Joint Secretary, Admin)",
    departmentId: "statistical",
    targetDepartment: "Survey Design and Research Division (SDRD)",
    targetUserId: "usr_001",
    targetUserName: "Rajesh Kumar",
    courseId: "cnt-1",
    courseTitle: "Understanding Corporate Insolvency Resolution Process",
    passingScorePercentage: 70,
    isLive: true,
    questions: [
      {
        id: 1,
        question: "Under Section 14 of the IBC 2016, what is the legal effect of declaring a moratorium during the Corporate Insolvency Resolution Process (CIRP)?",
        options: [
          "Prohibits institution or continuation of suits and execution of any judgment against the corporate debtor.",
          "Authorizes creditors to seize corporate assets without NCLT permission.",
          "Allows the corporate debtor to transfer and sell assets to third parties freely.",
          "Liquidates all financial debts immediately without adjudication."
        ],
        correctAnswer: 0,
        explanation: "Section 14 of IBC 2016 creates a statutory shield preventing recovery proceedings and execution of judicial decrees during CIRP.",
        sourceCitation: "IBC 2016, Section 14 (Moratorium Provisions)",
        relatedModule: "Module 2: Admission of CIRP & Moratorium Provisions (Section 14)",
        moduleId: 2
      },
      {
        id: 2,
        question: "What minimum voting share of the Committee of Creditors (CoC) is mandated to approve a Corporate Resolution Plan?",
        options: [
          "51% of voting share of financial creditors.",
          "66% of voting share of financial creditors present and voting.",
          "75% of total operational creditors.",
          "100% unanimous consent of all secured lenders."
        ],
        correctAnswer: 1,
        explanation: "As amended, Section 30(4) of the IBC mandates at least 66% affirmative voting share of the Committee of Creditors for resolution approval.",
        sourceCitation: "Section 30(4) of IBC 2016 & CoC Regulations",
        relatedModule: "Module 3: CoC Constitution, Voting Rights & Resolution Plans",
        moduleId: 3
      },
      {
        id: 3,
        question: "In the liquidation priority waterfall under Section 53 of IBC, which category holds first priority alongside insolvency resolution process costs?",
        options: [
          "Unsecured financial creditors.",
          "Workmen's dues for the period of 24 months preceding liquidation.",
          "Central Government direct tax arrears.",
          "Preference shareholders capital redemption."
        ],
        correctAnswer: 1,
        explanation: "Section 53(1)(b) ranks workmen's dues for 24 months pari passu with secured creditors who have relinquished security interest.",
        sourceCitation: "Section 53(1)(b) Waterfall Mechanism, IBC 2016",
        relatedModule: "Module 4: Liquidation Process & Priority Waterfall Mechanism",
        moduleId: 4
      }
    ]
  },
  {
    _id: "quiz-course-ml-1",
    id: "quiz-course-ml-1",
    title: "Department Admin Assessment: Post Office Act 2023 & Regulatory Compliance",
    documentName: "Post_Office_Act_2023_Official_Gazette.pdf",
    topic: "Postal Governance & Security Directives",
    difficulty: "Intermediate",
    questionCount: 3,
    createdAt: "Today",
    createdBy: "Dr. Arvind Mehta (ADG, SDRD)",
    departmentId: "statistical",
    targetDepartment: "Survey Design and Research Division (SDRD)",
    targetUserId: "usr_001",
    targetUserName: "Rajesh Kumar",
    courseId: "ml-1",
    courseTitle: "POST OFFICE ACT 2023",
    passingScorePercentage: 70,
    isLive: true,
    questions: [
      {
        id: 1,
        question: "Which landmark provision distinguishes the Post Office Act 2023 from the archaic Indian Post Office Act of 1898?",
        options: [
          "Elimination of the government's exclusive privilege of conveying letters, enabling citizen-centric digital logistics.",
          "Mandating physical paper stamps for all government communications.",
          "Banning private courier services across tier-2 cities.",
          "Decentralizing postal tariffs to village panchayats."
        ],
        correctAnswer: 0,
        explanation: "The 2023 Act revokes the colonial monopoly in Section 4 of the 1898 Act, establishing a modern regulatory baseline.",
        sourceCitation: "Gazette of India, Post Office Act 2023, Section 3",
        relatedModule: "Module 1: Overview and Objectives of Post Office Act 2023",
        moduleId: 1
      },
      {
        id: 2,
        question: "Under Section 9 of the Post Office Act 2023, under what grounds can an authorized officer intercept, open, or detain postal shipments?",
        options: [
          "In the interest of state security, friendly relations with foreign states, public order, emergency, or public safety.",
          "For routine market research and commercial advertising profiling.",
          "Whenever shipping weights deviate by more than 50 grams.",
          "Upon any anonymous telephonic complaint."
        ],
        correctAnswer: 0,
        explanation: "Section 9 strictly restricts interception powers to constitutional public order, national security, and public health exigencies.",
        sourceCitation: "Section 9, Post Office Act 2023 (Security & Interception)",
        relatedModule: "Module 3: Powers of Interception, Security & Customs Regulations",
        moduleId: 3
      },
      {
        id: 3,
        question: "What digital delivery framework is integrated into India Post's service level agreement (SLA) under the 2023 modernization plan?",
        options: [
          "End-to-end digital tracking, Centralized Public Grievance Redressal (CPGRAMS) integration, and Digital Addressing Grid.",
          "Manual ledger maintenance with physical receipt books.",
          "Mandatory telegraphic confirmation for all parcel deliveries.",
          "Non-computerized postal order processing."
        ],
        correctAnswer: 0,
        explanation: "Modernization mandates DIGIPIN integration, CPGRAMS syncing, and digital auditability across all branch post offices.",
        sourceCitation: "Module 4 (Digital Services & Grievance SLA)",
        relatedModule: "Module 4: Grievance Redressal and Digital Services Integration",
        moduleId: 4
      }
    ]
  },
  {
    _id: "quiz-course-crs-101",
    id: "quiz-course-crs-101",
    title: "Department Admin Assessment: Python for Microdata Processing & NSS Vectorization",
    documentName: "NSSTA_Python_Microdata_Vectorization_Manual.pdf",
    topic: "Survey Vectorization & Multipliers",
    difficulty: "Intermediate",
    questionCount: 3,
    createdAt: "Today",
    createdBy: "Dr. Arvind Mehta (ADG, SDRD)",
    departmentId: "statistical",
    targetDepartment: "Survey Design and Research Division (SDRD)",
    targetUserId: "usr_001",
    targetUserName: "Rajesh Kumar",
    courseId: "crs-101",
    courseTitle: "Python for Microdata Processing & NSS Vectorization",
    passingScorePercentage: 70,
    isLive: true,
    questions: [
      {
        id: 1,
        question: "Why is vectorized computation using NumPy/Polars preferred over iterative row-by-row looping when processing multi-round NSS unit datasets?",
        options: [
          "Vectorization executes compiled SIMD C-level instructions, reducing execution time from hours to seconds for 10M+ rows.",
          "Vectorization is mandatory only because Python loops are syntactically illegal in MoSPI scripts.",
          "It disables all memory caching on local computers.",
          "It automatically encrypts survey results into PDF format."
        ],
        correctAnswer: 0,
        explanation: "Vectorized operations leverage underlying BLAS/LAPACK optimizations and contiguous memory layout to achieve high throughput on massive microdata files.",
        sourceCitation: "NSSTA Technical Guide, Module 1 (Vectorized Operations)",
        relatedModule: "Module 1: Vectorized operations on multi-gigabyte survey files",
        moduleId: 1
      },
      {
        id: 2,
        question: "When applying multi-stage stratified multipliers in Polars, how should the base weight `W_base` be combined with sub-sample weight multipliers?",
        options: [
          "df.with_columns(adjusted_wt = pl.col('w_base') * (pl.col('total_ssu') / pl.col('surveyed_ssu')))",
          "df.select(pl.col('w_base') + 100)",
          "By deleting all missing rows and setting weights to 1.0",
          "By dividing the state population by total survey pages"
        ],
        correctAnswer: 0,
        explanation: "Stratified weighting calculates post-stratified inflation factors using vectorized columnar multiplication.",
        sourceCitation: "NSSTA Technical Guide, Module 2 (Survey Multipliers)",
        relatedModule: "Module 2: Handling complex survey weights & stratified multipliers",
        moduleId: 2
      },
      {
        id: 3,
        question: "Which automated validation check in Python ensures microdata consistency for Periodic Labour Force Survey (PLFS) activity status codes?",
        options: [
          "Verifying that Principal Activity Status (ps_code) and Subsidiary Status (ss_code) satisfy valid 2-digit NSSO classification ranges.",
          "Verifying that respondent names are sorted alphabetically.",
          "Checking that survey dates are always Mondays.",
          "Ensuring file sizes are exactly 50 megabytes."
        ],
        correctAnswer: 0,
        explanation: "Activity status consistency matrices check cross-tabulated bounds between weekly status and principal status codes.",
        sourceCitation: "NSSTA Technical Guide, Module 3 (Consistency Rules)",
        relatedModule: "Module 3: Automated consistency checks & outlier detection rules",
        moduleId: 3
      }
    ]
  }
];
