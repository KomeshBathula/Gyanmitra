import { mockUsers } from './mockUsers.js';
import { mockCourses } from './mockCourses.js';
import { mockCompetencies, mockCompetencyOverview } from './mockCompetencies.js';
import { mockAssessments } from './mockAssessments.js';
import { mockTrainingPrograms } from './mockTrainingPrograms.js';
import { mockNotifications } from './mockNotifications.js';

/**
 * GyanMitra In-Memory Database Store
 * Designed with MongoDB-compatible entity schemas for straightforward Phase 2 migration.
 */

export const db = {
  // 1. Users Collection
  users: [...mockUsers],

  // 2. Courses Catalog Collection (iGOT & MoSPI courses)
  courses: [...mockCourses],
  coursesCatalog: [...mockCourses],

  // 3. Competencies & ACBP Framework
  competenciesList: [...mockCompetencies],
  competencies: { ...mockCompetencyOverview },

  // 4. Assessments & Question Bank
  assessments: [...mockAssessments],
  assessmentResults: [],
  generatedQuizzes: [
    {
      id: "quiz-gen-101",
      title: "AI Assessment: NSS 79th Round Sampling & Estimation Protocol",
      documentName: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
      topic: "Survey Sampling & Estimation",
      difficulty: "Medium",
      questionCount: 3,
      createdAt: "Today, 11:45 AM",
      createdBy: "Dr. Mehta (Admin)",
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
          sourceCitation: "Page 18, Para 2.4.1 (Sampling Methodology Manual)"
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
          explanation: "Section 5.3 (Estimation Procedure, page 42) explicitly mandates: Multiplier_adj = Multiplier_base * (Allocated_SSUs / Surveyed_SSUs).",
          sourceCitation: "Page 42, Formula 5.3 (Estimation & Multipliers)"
        },
        {
          id: 3,
          question: "Which data consistency rule is enforced for CAPI Schedule 21.1 electronic survey forms?",
          options: [
            "Automated ratio checks trigger a supervisor hard-warning if household consumer expenditure exceeds 50x monthly income.",
            "Field investigators can bypass household roster verification if time is short.",
            "All data must be stored in plaintext XML without encryption on Android tablets.",
            "Geo-tagging is strictly optional for rural First Stage Units."
          ],
          correctAnswer: 0,
          explanation: "Page 67, CAPI Protocol Annexure: Automated ratio validation prevents illogical consumer expenditure entries before tablet form submission.",
          sourceCitation: "Annexure C, Page 67 (CAPI Quality Assurance)"
        }
      ]
    }
  ],

  // 5. NSSTA Training Programs
  trainingPrograms: [...mockTrainingPrograms],

  // 6. Notifications Collection
  notifications: [...mockNotifications],

  // 7. My Learning Ledger
  myLearningCourses: [
    {
      id: "ml-1",
      courseId: "IGOT-POST-2023-01",
      title: "POST OFFICE ACT 2023",
      provider: "RAKNPA",
      type: "Course",
      level: "Intermediate",
      difficulty: "Intermediate",
      duration: "24m 16s",
      progress: 62,
      isRetired: true,
      status: "inprogress",
      bgGradient: "from-slate-700 via-slate-800 to-slate-900",
      thumbnailText: "POST OFFICE ACT 2023",
      thumbnailSub: "RAK National Postal Academy",
      syllabus: [
        "Module 1: Overview and Objectives of Post Office Act 2023",
        "Module 2: Key Amendments over the Indian Post Office Act 1898",
        "Module 3: Powers of Interception, Security & Customs Regulations",
        "Module 4: Grievance Redressal and Digital Services Integration"
      ]
    },
    {
      id: "ml-2",
      courseId: "IGOT-POST-2023-02",
      title: "ePost office",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
      difficulty: "Beginner",
      duration: "41m 12s",
      progress: 70,
      isRetired: false,
      status: "inprogress",
      bgGradient: "from-amber-800 via-orange-900 to-amber-950",
      thumbnailText: "ePost office",
      thumbnailSub: "Department of Posts Portal",
      syllabus: [
        "Module 1: Digital Portal Infrastructure & Service Architecture",
        "Module 2: Electronic Money Order & Instant Money Order Booking",
        "Module 3: Postal Life Insurance (PLI/RPLI) Online Renewal",
        "Module 4: Customer Helpdesk and Digital Tracking Protocols"
      ]
    },
    {
      id: "ml-3",
      courseId: "IGOT-POST-2023-03",
      title: "Customer Relationship Management in India Post",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
      difficulty: "Beginner",
      duration: "42m 29s",
      progress: 71,
      isRetired: false,
      status: "inprogress",
      bgGradient: "from-teal-800 via-emerald-900 to-teal-950",
      thumbnailText: "CRM in India Post",
      thumbnailSub: "Citizen Centric Delivery",
      syllabus: [
        "Module 1: Principles of Citizen-Centric Public Service Delivery",
        "Module 2: CRM Software Navigation and Ticket Management",
        "Module 3: Handling Public Queries, Escalations and TAT SLAs",
        "Module 4: Feedback Loops and Citizen Satisfaction Metrics"
      ]
    },
    {
      id: "ml-4",
      courseId: "IGOT-POST-2023-04",
      title: "Awareness on Marketing Concepts",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
      difficulty: "Beginner",
      duration: "24m 32s",
      progress: 62,
      isRetired: false,
      status: "inprogress",
      bgGradient: "from-yellow-700 via-amber-800 to-yellow-950",
      thumbnailText: "Awareness on Marketing Concepts",
      thumbnailSub: "Department of Posts",
      syllabus: [
        "Module 1: Fundamental Marketing Concepts for Public Undertakings",
        "Module 2: Product Segmentation: Speed Post, Parcel & Retail",
        "Module 3: Branding, Promotional Campaigns & Public Reach",
        "Module 4: B2B vs B2C Government Service Positioning"
      ]
    },
    {
      id: "ml-5",
      courseId: "IGOT-AUDIT-2023-05",
      title: "Disciplinary Proceedings in Government",
      provider: "National Academy of Audit & Accounts",
      type: "Course",
      level: "Intermediate",
      difficulty: "Intermediate",
      duration: "3h 57m",
      progress: 10,
      isRetired: false,
      status: "inprogress",
      bgGradient: "from-slate-700 via-indigo-950 to-slate-900",
      thumbnailText: "Disciplinary Proceedings in Government",
      thumbnailSub: "Government of India Rules",
      syllabus: [
        "Module 1: Constitutional Provisions: Article 311 & Natural Justice",
        "Module 2: Framing of Charge-Sheet under CCS (CCA) Rules 1965",
        "Module 3: Inquiry Officer Duties & Examination of Evidence",
        "Module 4: Imposition of Minor vs Major Penalties & Appeals"
      ]
    },
    {
      id: "ml-6",
      courseId: "IGOT-STEEL-2023-06",
      title: "Preventive Vigilance",
      provider: "Steel Ministry of India",
      type: "Course",
      level: "Beginner",
      difficulty: "Beginner",
      duration: "1h 33m",
      progress: 0,
      isRetired: false,
      status: "inprogress",
      bgGradient: "from-blue-900 via-cyan-950 to-blue-950",
      thumbnailText: "PREVENTIVE VIGILANCE",
      thumbnailSub: "Ministry of Steel",
      syllabus: [
        "Module 1: Concepts and Importance of Preventive Vigilance",
        "Module 2: Identification of Sensitive Posts & Rotation Policies",
        "Module 3: Systemic Improvements, GeM Procurement & Audits",
        "Module 4: Whistleblower Protection and Integrity Pacts"
      ]
    }
  ],

  completedCourses: [
    {
      id: "ml-c-1",
      title: "Foundation Training on Python for Large Microdata",
      provider: "National Statistical Systems Training Academy (NSSTA)",
      type: "Course",
      level: "Intermediate",
      duration: "4h 30m",
      progress: 100,
      isRetired: false,
      status: "completed",
      bgGradient: "from-emerald-900 via-slate-900 to-teal-950",
      thumbnailText: "Python for Microdata Analysis",
      thumbnailSub: "NSSTA Greater Noida",
      completedOn: "28 Aug 2024"
    },
    {
      id: "ml-c-2",
      title: "Code of Ethics and Conduct for Public Servants",
      provider: "LBSNAA Mussoorie",
      type: "Course",
      level: "Beginner",
      duration: "1h 45m",
      progress: 100,
      isRetired: false,
      status: "completed",
      bgGradient: "from-indigo-900 via-slate-900 to-blue-950",
      thumbnailText: "Public Service Ethics",
      thumbnailSub: "Mission Karmayogi Bharat",
      completedOn: "14 Jul 2024"
    }
  ],

  unenrolledCourses: [
    {
      id: "ml-u-1",
      title: "National Accounts Statistics: Supply and Use Tables",
      provider: "Ministry of Statistics & Programme Implementation (MoSPI)",
      type: "Blended Program",
      level: "Advanced",
      duration: "6h 15m",
      progress: 0,
      isRetired: false,
      status: "unenrolled",
      bgGradient: "from-purple-900 via-slate-900 to-indigo-950",
      thumbnailText: "Supply & Use Tables",
      thumbnailSub: "MoSPI National Accounts"
    }
  ],

  // 8. Marketplace Providers & AR
  marketplaceProviders: [
    {
      id: "p-1",
      name: "SIMPLILEARN",
      bannerColor: "bg-[#0097A7]",
      logoText: "simplilearn",
      logoTextColor: "text-blue-600",
      category: "EdTech & Certifications",
      description: "Global digital skills provider offering curated masterclasses in Python, Cloud Computing, Data Science, and Public Sector AI Governance.",
      activeCoursesCount: 42,
      courses: [
        "Post Graduate Program in Data Engineering",
        "Python for Data Science & Predictive Analytics",
        "Certified Cloud Solutions Architect",
        "AI for Public Administrators"
      ]
    },
    {
      id: "p-2",
      name: "National Urban Learning Platform",
      bannerColor: "bg-[#0097A7]",
      logoText: "NULP / NIUA",
      logoTextColor: "text-teal-700",
      category: "Urban Governance & Municipal Systems",
      description: "National Institute of Urban Affairs platform delivering municipal capacity, GIS city mapping, urban data analytics, and AMRUT mission planning.",
      activeCoursesCount: 28,
      courses: [
        "Urban GIS Mapping & Spatial Analytics",
        "Municipal Finance & Revenue Mobilization",
        "Smart Cities Digital Infrastructure",
        "Sustainable Urban Water Management"
      ]
    },
    {
      id: "p-3",
      name: "eCornell",
      bannerColor: "bg-[#94612A]",
      logoText: "eCornell",
      logoTextColor: "text-red-700",
      category: "Executive Education & Leadership",
      description: "Cornell University professional certificates in Strategic Leadership, Public Policy, Data-Driven Decision Making, and Administrative Excellence.",
      activeCoursesCount: 35,
      courses: [
        "Executive Leadership in Public Administration",
        "Data-Driven Decision Making for Policy Makers",
        "Strategic HR & Performance Management",
        "Public Sector Negotiation Strategies"
      ]
    },
    {
      id: "p-4",
      name: "Coursera",
      bannerColor: "bg-[#4163E9]",
      logoText: "coursera",
      logoTextColor: "text-blue-600",
      category: "Global University Consortium",
      description: "World-leading universities offering official government-subsidized specializations in Econometrics, Statistics, Machine Learning, and Public Finance.",
      activeCoursesCount: 110,
      courses: [
        "Applied Econometrics & Time Series Analysis (Yale)",
        "Machine Learning for Public Sector (Stanford)",
        "Survey Analysis with R & Python (Johns Hopkins)",
        "Public Financial Management (IMF)"
      ]
    },
    {
      id: "p-5",
      name: "Harvard Business Impact",
      bannerColor: "bg-[#4163E9]",
      logoText: "HARVARD BUSINESS IMPACT",
      logoTextColor: "text-red-900",
      category: "Strategic Leadership & Governance",
      description: "Harvard Business Publishing programs focused on adaptive leadership, crisis communication, inter-ministerial coordination, and transformational public governance.",
      activeCoursesCount: 19,
      courses: [
        "Adaptive Leadership in Times of Crisis",
        "Driving Transformational Public Innovation",
        "Effective Stakeholder Management",
        "Strategic Governance & Policy Execution"
      ]
    }
  ],

  marketplaceAR: [
    {
      id: "ar-1",
      title: "AR 3D Field Survey Simulation: NSS Household Listing",
      provider: "NSSTA Greater Noida",
      duration: "45m",
      device: "WebXR / Mobile AR",
      description: "Interactive 3D walkthrough of physical FSU village listing, boundary demarcation, and randomized second-stage sampling."
    },
    {
      id: "ar-2",
      title: "VR Disaster Management & Census Evacuation Protocol",
      provider: "National Disaster Management Authority",
      duration: "30m",
      device: "VR Headset / Web 3D",
      description: "Simulated flood and emergency evacuation route planning aligned with geospatial Census GIS mapping."
    }
  ],

  // 9. Trainer Cohort Analytics Data
  trainerBatchData: {
    activeBatches: [
      {
        id: "batch-101",
        name: "ISS Probationers Batch 46: Official Statistics & Sampling",
        cadre: "ISS Group A",
        learnersCount: 38,
        attendanceRate: 94.5,
        avgCompetencyScore: 81.2,
        completionRate: 78.0,
        pendingAssessments: 6,
        status: "In Progress"
      },
      {
        id: "batch-102",
        name: "SSS Refresher: CAPI & Microdata Processing",
        cadre: "Subordinate Statistical Service",
        learnersCount: 52,
        attendanceRate: 91.0,
        avgCompetencyScore: 74.6,
        completionRate: 85.0,
        pendingAssessments: 12,
        status: "In Progress"
      }
    ]
  },

  // 10. Admin Workforce Intelligence Data
  adminWorkforceData: {
    totalEmployeesTracked: 14820,
    complianceRate: 88.4,
    avgCompetencyScore: 73.8,
    highPriorityGapsCount: 412,
    completedTrainingHours: 128400,
    divisionMetrics: [
      { division: "Survey Design & Research (SDRD)", headcount: 1420, compliance: 92.1, avgScore: 84.5 },
      { division: "Data Processing Division (DPD)", headcount: 2180, compliance: 89.4, avgScore: 79.2 },
      { division: "National Accounts Division (NAD)", headcount: 860, compliance: 94.0, avgScore: 86.1 },
      { division: "Field Operations Division (FOD)", headcount: 8400, compliance: 86.2, avgScore: 69.8 }
    ]
  },

  // 11. Reports Catalog
  reportsCatalog: [
    {
      id: "rep-1",
      title: "Annual Capacity Building Plan (ACBP) Compliance Audit 2026",
      type: "Ministry Compliance Audit",
      dateGenerated: "2026-09-01",
      cadre: "ISS & SSS Combined",
      fileSize: "2.4 MB",
      format: "PDF / CSV"
    },
    {
      id: "rep-2",
      title: "Official Statistical System Competency Ledger & Gap Analysis",
      type: "Competency Matrix",
      dateGenerated: "2026-09-08",
      cadre: "MoSPI SDRD & DPD",
      fileSize: "1.8 MB",
      format: "PDF / XLSX"
    }
  ]
};
