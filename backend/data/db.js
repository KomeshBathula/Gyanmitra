// Mock MongoDB Database store initialized with authentic MoSPI / NSSTA dataset
export const db = {
  users: [
    {
      _id: "usr_001",
      name: "Rajesh Kumar, ISS",
      employeeId: "GOI-MOSPI-2018-0492",
      designation: "Deputy Director",
      department: "Survey Design and Research Division (SDRD)",
      ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
      cadre: "Indian Statistical Service (ISS)",
      location: "Sardar Patel Bhawan, New Delhi",
      email: "rajesh.kumar@gov.in",
      reportingOfficer: "Dr. Arvind Mehta, Senior Economic Adviser",
      experienceYears: 7,
      education: "M.Sc. in Statistics, University of Delhi",
      karmayogiCredits: 420,
      role: "employee",
      overallCompetency: 68
    }
  ],

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

  courses: [
    {
      id: "crs-101",
      title: "Python for Microdata Processing & NSS Vectorization",
      provider: "NSSTA Greater Noida",
      providerType: "NSSTA",
      code: "NSSTA-STAT-2026-08",
      competency: "Python for Data Analysis",
      category: "Technical",
      duration: "20 Hours",
      difficulty: "Intermediate (Level 3)",
      matchScore: 96,
      isRecommended: true
    },
    {
      id: "crs-102",
      title: "Applied Machine Learning for National Accounts & Imputation",
      provider: "iGOT Karmayogi",
      providerType: "iGOT",
      code: "IGOT-MOSPI-ML-402",
      competency: "AI / Machine Learning in Statistics",
      category: "Technical",
      duration: "24 Hours",
      difficulty: "Advanced (Level 3-4)",
      matchScore: 94,
      isRecommended: true
    },
    {
      id: "crs-103",
      title: "Interactive Statistical Dashboards & Data Storytelling",
      provider: "NSSTA Greater Noida",
      providerType: "NSSTA",
      code: "NSSTA-TECH-2026-14",
      competency: "Data Visualization & Executive BI",
      category: "Technical",
      duration: "12 Hours",
      difficulty: "Intermediate (Level 3)",
      matchScore: 89,
      isRecommended: true
    }
  ],

  notifications: [
    {
      id: "notif-1",
      title: "High-Priority Skill Bridge Recommended",
      description: "Your recent assessment indicates a gap in Python for Data Analysis. NSSTA Course 'Python for Microdata' has been prioritized.",
      time: "10 mins ago",
      priority: "high",
      read: false
    },
    {
      id: "notif-2",
      title: "NSSTA Greater Noida Workshop Nomination Open",
      description: "Nominations for Applied Machine Learning in Official Statistics closing on 30 Sep 2026.",
      time: "2 hours ago",
      priority: "high",
      read: false
    }
  ]
};
