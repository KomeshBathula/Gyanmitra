// Official GyanMitra Database Store aligned with iGOT Karmayogi Bharat & MoSPI

export const db = {
  // 1. User Profiles Store
  users: [
    {
      _id: "usr_001",
      name: "Rajeswari Malluri",
      employeeId: "AP-GDS-89211",
      designation: "Branch Postmaster",
      group: "GDS",
      department: "Andhra Pradesh Postal Circle",
      ministry: "Ministry of Communications - Department of Posts",
      cadre: "Andhra Pradesh Postal Circle",
      location: "Vijayawada, Andhra Pradesh",
      email: "mallurirajeswari8@gmail.com",
      phone: "+91 6304299961",
      reportingOfficer: "Superintendent of Post Offices",
      experienceYears: 6,
      education: "Bachelor of Science, Andhra University",
      karmayogiCredits: 799,
      currentRank: "146th Rank",
      learningHours: "146h 34m",
      badgesEarned: 0,
      certificatesCount: 75,
      postsCount: 0,
      profileCompletion: 36.7,
      role: "employee",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      bio: ""
    },
    {
      _id: "usr_002",
      name: "Rajesh Kumar, ISS",
      employeeId: "GOI-MOSPI-2018-0492",
      designation: "Deputy Director",
      group: "Group A",
      department: "Survey Design and Research Division (SDRD)",
      ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
      cadre: "Indian Statistical Service (ISS)",
      location: "Sardar Patel Bhawan, New Delhi",
      email: "rajesh.kumar@gov.in",
      phone: "+91 9810234567",
      reportingOfficer: "Dr. Arvind Mehta, Senior Economic Adviser",
      experienceYears: 8,
      education: "M.Sc. in Statistics, University of Delhi",
      karmayogiCredits: 850,
      currentRank: "42nd Rank",
      learningHours: "182h 10m",
      badgesEarned: 4,
      certificatesCount: 88,
      postsCount: 12,
      profileCompletion: 92.5,
      role: "employee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Deputy Director in SDRD MoSPI focusing on NSS sample design, CAPI data validation, and automated microdata processing."
    }
  ],

  // 2. Explore All Contents Catalog (9159+ Indexed Items)
  coursesCatalog: [
    {
      id: "cnt-1",
      title: "Understanding Corporate Insolvency Resolution Process",
      code: "IBC-CIRP-2024",
      type: "Course",
      level: "Intermediate",
      duration: "1h 10m",
      language: "English",
      provider: "Ministry of Communications- Department of Telecommunications",
      category: "Course",
      sector: "Information Technology",
      subSector: "Administration",
      isNew: true,
      bannerBg: "from-amber-900 via-slate-900 to-blue-950",
      bannerBadge: "IBC 2016: Corporate Insolvency Resolution Process",
      karmaPoints: 120,
      description: "An exhaustive regulatory guide covering CIRP processes, Committee of Creditors (CoC) voting thresholds, Resolution Professional obligations, and NCLT jurisprudence.",
      syllabus: [
        "Module 1: Overview of IBC 2016 & Legislative Intent",
        "Module 2: Admission of CIRP & Moratorium Provisions (Section 14)",
        "Module 3: CoC Constitution, Voting Rights & Resolution Plans",
        "Module 4: Liquidation Process & Priority Waterfall Mechanism"
      ]
    },
    {
      id: "cnt-2",
      title: "Central Civil Services (Conduct) Rules 1964",
      code: "CCS-COND-1964",
      type: "Course",
      level: "Beginner",
      duration: "25m 17s",
      language: "English",
      provider: "National Academy of Defence Financial Management (NADFM)",
      category: "Course",
      sector: "Defence",
      subSector: "Administration",
      isNew: true,
      bannerBg: "from-blue-950 via-slate-900 to-indigo-950",
      bannerBadge: "Central Civil Services (Conduct) Rules 1964",
      karmaPoints: 80,
      description: "Essential orientation to CCS (Conduct) Rules 1964 governing public servants, integrity maintenance, political non-partisanship, and prevention of conflict of interest.",
      syllabus: [
        "Module 1: General Principles of Official Integrity (Rule 3)",
        "Module 2: Acceptance of Gifts, Hospitality & Awards (Rule 13)",
        "Module 3: Movable and Immovable Property Disclosures (Rule 18)",
        "Module 4: Disciplinary Action & Inquiries under CCA Rules"
      ]
    },
    {
      id: "cnt-3",
      title: "Introduction to Personalized Cheque Books in India Post",
      code: "IP-CHQ-2024",
      type: "Moderated Course",
      level: "Beginner",
      duration: "32m 23s",
      language: "English",
      provider: "Department of Posts",
      category: "Moderated Course",
      sector: "Education",
      subSector: "Data",
      isNew: true,
      bannerBg: "from-rose-950 via-slate-900 to-amber-950",
      bannerBadge: "Department of Posts, India: Personalized Cheque Books",
      karmaPoints: 90,
      description: "Comprehensive operational manual for postal officers on issuing, personalizing, and validating MICR cheque books for Post Office Savings Bank (POSB) account holders.",
      syllabus: [
        "Module 1: POSB Account Regulations & Cheque Facility Eligibility",
        "Module 2: Finacle CBS Workflow for Cheque Book Requisition",
        "Module 3: CTS-2010 Clearing Standards & Safety Features",
        "Module 4: Stop Payment Protocol & Fraud Mitigation"
      ]
    },
    {
      id: "cnt-4",
      title: "Understanding the Defence Export Import Portal",
      code: "DEF-EXIM-2024",
      type: "Course",
      level: "Beginner",
      duration: "1h 09m",
      language: "English",
      provider: "National Academy of Defence Production (NADP) Nagpur",
      category: "Course",
      sector: "Defence",
      subSector: "Heavy Industry",
      isNew: true,
      bannerBg: "from-cyan-950 via-slate-900 to-blue-950",
      bannerBadge: "Defence Export Import Portal",
      karmaPoints: 110,
      description: "Step-by-step user walkthrough of the Defence EXIM online portal facilitating authorisations, end-user certification, and SCOMET licensing under Make in India.",
      syllabus: [
        "Module 1: Defence Production & Export Policy Framework",
        "Module 2: Portal Registration & Digital Signature (DSC) Integration",
        "Module 3: Processing In-Principle Export Authorisations",
        "Module 4: End-User Certificate (EUC) Verification Workflows"
      ]
    },
    {
      id: "cnt-5",
      title: "MoSPI NSS 79th Round: Sampling Methodology & Field Guidelines",
      code: "MOSPI-NSS79-2024",
      type: "Course",
      level: "Intermediate",
      duration: "2h 15m",
      language: "English",
      provider: "National Statistical Systems Training Academy (NSSTA) Greater Noida",
      category: "Course",
      sector: "Information Technology",
      subSector: "Data",
      isNew: true,
      bannerBg: "from-emerald-950 via-slate-900 to-teal-950",
      bannerBadge: "MoSPI NSS 79th Round Sampling Methodology",
      karmaPoints: 200,
      description: "Official NSSTA training module on multi-stage stratified sampling design, circular systematic household selection, and CAPI survey data collection.",
      syllabus: [
        "Module 1: NSS Sampling Frame: Census Villages & UFS Blocks",
        "Module 2: Household Listing, Stratification & Sub-Sample Selection",
        "Module 3: CAPI Digital Questionnaire Validation Rules",
        "Module 4: Multiplier Computation & Non-Sampling Error Adjustments"
      ]
    },
    {
      id: "cnt-6",
      title: "National Accounts Statistics: GDP & GVA Computation Framework",
      code: "MOSPI-NAS-2024",
      type: "Blended Program",
      level: "Intermediate",
      duration: "3h 40m",
      language: "English",
      provider: "Ministry of Statistics & Programme Implementation (MoSPI)",
      category: "Blended Program",
      sector: "Information Technology",
      subSector: "Data",
      isNew: true,
      bannerBg: "from-indigo-950 via-slate-900 to-blue-950",
      bannerBadge: "National Accounts Statistics: GDP & GVA Framework",
      karmaPoints: 250,
      description: "Methodological framework for compiling Gross Domestic Product (GDP), Gross Value Added (GVA), and Gross Fixed Capital Formation (GFCF) based on SNA 2008 standards.",
      syllabus: [
        "Module 1: Production, Income & Expenditure Approaches to GDP",
        "Module 2: MCA-21 Corporate Database Integration in GVA",
        "Module 3: Price Indices & Constant Price Deflators (CPI, WPI)",
        "Module 4: Quarterly GDP Estimation & Advance Release Calendars"
      ]
    }
  ],

  // 3. The iGOT Marketplace Providers & Augmented Reality
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

  // 4. My Learning Enrolled Courses
  myLearningCourses: [
    {
      id: "ml-1",
      title: "POST OFFICE ACT 2023",
      provider: "RAKNPA",
      type: "Course",
      level: "Intermediate",
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
      title: "ePost office",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
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
      title: "Customer Relationship Management in India Post",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
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
      title: "Awareness on Marketing Concepts",
      provider: "Department of Posts",
      type: "Course",
      level: "Beginner",
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
      title: "Disciplinary Proceedings in Government",
      provider: "National Academy of Audit & Accounts",
      type: "Course",
      level: "Intermediate",
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
      title: "Preventive Vigilance",
      provider: "Steel Ministry of India",
      type: "Course",
      level: "Beginner",
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

  // 5. ACBP Competencies & Skill Gaps
  competencies: {
    overallScore: 68,
    monthlyDelta: "+8%",
    categories: [
      { id: "stat", name: "Statistical Competencies", score: 82, target: 85, count: 8 },
      { id: "tech", name: "Technical & Coding Competencies", score: 61, target: 80, count: 6 },
      { id: "gov", name: "Digital Governance & Data Privacy", score: 74, target: 75, count: 5 },
      { id: "mgmt", name: "Behavioural & Statistical Leadership", score: 78, target: 80, count: 4 }
    ]
  },

  skillGaps: [
    {
      id: "gap-1",
      competency: "Python for Data Analysis",
      category: "Technical",
      currentLevel: 2,
      requiredLevel: 4,
      gap: 2,
      priority: "High",
      why: "Demonstrated competency in Python is Level 2, while ISS Deputy Director role mandates Level 4 for National Sample Survey microdata vectorization.",
      recommendedCourse: "Python for Official Statistics & Microdata Processing",
      provider: "NSSTA Greater Noida"
    },
    {
      id: "gap-2",
      competency: "AI / Machine Learning in Statistics",
      category: "Technical",
      currentLevel: 1,
      requiredLevel: 3,
      gap: 2,
      priority: "High",
      why: "Modern statistical compilation mandates ML techniques for automated non-response imputation and outlier detection.",
      recommendedCourse: "Applied Machine Learning for National Accounts & Survey Imputation",
      provider: "iGOT Karmayogi"
    },
    {
      id: "gap-3",
      competency: "Data Visualization & Executive BI",
      category: "Technical",
      currentLevel: 2,
      requiredLevel: 3,
      gap: 1,
      priority: "Medium",
      why: "Cabinet Secretariat briefings require interactive dashboards for high-frequency economic indicators (CPI, IIP).",
      recommendedCourse: "Interactive Statistical Dashboards & Data Storytelling",
      provider: "NSSTA Greater Noida"
    },
    {
      id: "gap-4",
      competency: "National Data Governance & DPDP Act 2023",
      category: "Digital Governance",
      currentLevel: 2,
      requiredLevel: 3,
      gap: 1,
      priority: "Medium",
      why: "Mandatory compliance for open microdata dissemination requires certified Level 3 privacy engineering skills.",
      recommendedCourse: "Data Anonymization and Privacy Compliance in Official Statistics",
      provider: "iGOT Karmayogi"
    }
  ],

  learningPathway: [
    {
      step: 1,
      id: "path-1",
      title: "Python Fundamentals for Government Statisticians",
      provider: "iGOT Karmayogi",
      duration: "14 Hours",
      skillLevel: "Level 2",
      status: "completed",
      progress: 100,
      score: "92% Score"
    },
    {
      step: 2,
      id: "path-2",
      title: "Python for Microdata Processing & NSS Vectorization",
      provider: "NSSTA Greater Noida",
      duration: "20 Hours",
      skillLevel: "Level 3",
      status: "current",
      progress: 65,
      score: "Module 4 of 6"
    },
    {
      step: 3,
      id: "path-3",
      title: "Statistical Visualization with Python & Open-Source BI",
      provider: "iGOT Karmayogi",
      duration: "12 Hours",
      skillLevel: "Level 3",
      status: "upcoming",
      progress: 0,
      score: "Pending"
    },
    {
      step: 4,
      id: "path-4",
      title: "Applied Machine Learning for National Accounts & Imputation",
      provider: "NSSTA Greater Noida",
      duration: "24 Hours",
      skillLevel: "Level 3-4",
      status: "upcoming",
      progress: 0,
      score: "Nomination Approved"
    }
  ],

  // 6. Notifications & Events
  notifications: [
    {
      id: "notif-1",
      title: "High-Priority Skill Bridge Recommended",
      description: "Your recent assessment indicates a gap in Python for Data Analysis. NSSTA Course 'Python for Microdata' has been prioritized.",
      time: "10 mins ago",
      priority: "high",
      read: false,
      actionLink: "learning-path"
    },
    {
      id: "notif-2",
      title: "NSSTA Greater Noida Workshop Nomination Open",
      description: "Nominations for Applied Machine Learning in Official Statistics closing on 30 Sep 2026.",
      time: "2 hours ago",
      priority: "high",
      read: false,
      actionLink: "marketplace"
    },
    {
      id: "notif-3",
      title: "ACBP Quarterly Competency Review Ready",
      description: "Your competency score increased by +8% following successful completion of Python Fundamentals.",
      time: "1 day ago",
      priority: "medium",
      read: true,
      actionLink: "competencies"
    }
  ]
};
