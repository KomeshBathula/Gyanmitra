/**
 * Official Indian Statistical System User Entities
 * Roles: EMPLOYEE, TRAINER, ADMIN
 */

export const mockUsers = [
  {
    _id: "usr_001",
    name: "Rajeswari Malluri",
    employeeId: "MOSPI-GDS-89211",
    designation: "Branch Postmaster / Statistical Officer",
    group: "GDS / Subordinate Statistical Service",
    department: "Andhra Pradesh Postal Circle & SDRD Field Unit",
    ministry: "Ministry of Communications & MoSPI",
    division: "National Sample Survey Field Operations",
    cadre: "Andhra Pradesh Circle & Subordinate Cadre",
    location: "Vijayawada, Andhra Pradesh",
    email: "mallurirajeswari8@gmail.com",
    phone: "+91 6304299961",
    reportingOfficer: "Superintendent of Post Offices / Director (SDRD)",
    yearsOfExperience: 6,
    education: "Bachelor of Science (Statistics & Maths), Andhra University",
    roleResponsibilities: [
      "Field data collection & CAPI survey administration for NSS rounds",
      "Postal statistical record keeping and monthly returns compilation",
      "Public grievances data monitoring and CRM ticket resolution"
    ],
    previousTraining: [
      "Foundation Training on CAPI Survey Tools (NSSTA 2023)",
      "Citizen-Centric Public Service Delivery (DoPT 2024)"
    ],
    karmayogiCredits: 799,
    currentRank: "146th Rank",
    learningHours: "146h 34m",
    badgesEarned: 0,
    certificatesCount: 75,
    postsCount: 0,
    profileCompletion: 36.7,
    role: "EMPLOYEE",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Statistical Officer in field operations focusing on NSS household data validation and digital public services delivery.",
    competencies: [
      { id: "stat-1", name: "Survey Design & Sampling", currentLevel: 3, targetLevel: 4 },
      { id: "stat-2", name: "Field Data Validation (CAPI)", currentLevel: 3, targetLevel: 4 },
      { id: "tech-1", name: "Python for Data Analysis", currentLevel: 2, targetLevel: 4 },
      { id: "gov-1", name: "DPDP Act 2023 & Data Privacy", currentLevel: 2, targetLevel: 3 },
      { id: "mgmt-1", name: "Citizen Communication & Public Grievances", currentLevel: 4, targetLevel: 4 }
    ],
    completedCourses: [
      "crs-101",
      "crs-105"
    ],
    currentCourses: [
      "ml-1",
      "ml-2",
      "ml-3",
      "ml-4",
      "ml-5",
      "ml-6"
    ]
  },
  {
    _id: "usr_002",
    name: "Rajesh Kumar, ISS",
    employeeId: "GOI-MOSPI-2018-0492",
    designation: "Deputy Director",
    group: "Group A",
    department: "Survey Design and Research Division (SDRD)",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "Sampling Methodology & Data Vectorization",
    cadre: "Indian Statistical Service (ISS)",
    location: "Sardar Patel Bhawan, New Delhi",
    email: "rajesh.kumar@gov.in",
    phone: "+91 9810234567",
    reportingOfficer: "Dr. Arvind Mehta, Senior Economic Adviser",
    yearsOfExperience: 8,
    education: "M.Sc. in Statistics, University of Delhi",
    roleResponsibilities: [
      "Sample allocation and multi-stage stratification design for All-India NSS rounds",
      "Integration of MCA-21 enterprise records in Annual Survey of Industries",
      "Capacity building for ISS probationary officers at NSSTA"
    ],
    previousTraining: [
      "Advanced Econometrics (IMF Institute 2022)",
      "National Accounts Compilation (UNSD 2023)"
    ],
    karmayogiCredits: 850,
    currentRank: "42nd Rank",
    learningHours: "182h 10m",
    badgesEarned: 4,
    certificatesCount: 88,
    postsCount: 12,
    profileCompletion: 92.5,
    role: "EMPLOYEE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "ISS Cadre Officer specializing in survey stratification, multiplier estimation, and automated statistical data engineering."
  },
  {
    _id: "usr_003",
    name: "Dr. Meenakshi Sundaram",
    employeeId: "NSSTA-TRN-2015-0104",
    designation: "Senior Faculty & Course Director",
    group: "Group A",
    department: "National Statistical Systems Training Academy (NSSTA)",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "Training & Capacity Development",
    cadre: "Indian Statistical Service (ISS)",
    location: "NSSTA Campus, Greater Noida, Uttar Pradesh",
    email: "meenakshi.sundaram@nssta.gov.in",
    phone: "+91 9911223344",
    reportingOfficer: "Director General, NSSTA",
    yearsOfExperience: 16,
    education: "Ph.D. in Mathematical Statistics, ISI Kolkata",
    roleResponsibilities: [
      "Curriculum design for Annual Capacity Building Plan (ACBP)",
      "Evaluation of mid-career training programs for ISS & SSS officers",
      "Assessment moderation and competency certification"
    ],
    karmayogiCredits: 1250,
    currentRank: "8th Rank",
    learningHours: "340h 00m",
    badgesEarned: 12,
    certificatesCount: 140,
    postsCount: 38,
    profileCompletion: 100.0,
    role: "TRAINER",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    bio: "Course Director at NSSTA Greater Noida specializing in official statistics pedagogy, sample design, and machine learning in public policy."
  },
  {
    _id: "usr_004",
    name: "Dr. Arvind Mehta",
    employeeId: "MOSPI-ADM-2010-0012",
    designation: "Additional Director General & Head of Cadre",
    group: "Higher Administrative Grade (HAG)",
    department: "Administration & Workforce Intelligence",
    ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
    division: "Cadre Management & Policy Evaluation",
    cadre: "Indian Statistical Service (ISS)",
    location: "Sardar Patel Bhawan, New Delhi",
    email: "arvind.mehta@gov.in",
    phone: "+91 9811223355",
    reportingOfficer: "Secretary, MoSPI & Chief Statistician of India",
    yearsOfExperience: 22,
    education: "M.Phil & Ph.D. in Econometrics, JNU New Delhi",
    roleResponsibilities: [
      "Strategic governance of ACBP roadmap across all MoSPI divisions",
      "Monitoring national compliance for DoPT annual capacity milestones",
      "Executive workforce capability resource allocation"
    ],
    karmayogiCredits: 1980,
    currentRank: "3rd Rank",
    learningHours: "520h 30m",
    badgesEarned: 20,
    certificatesCount: 210,
    postsCount: 64,
    profileCompletion: 100.0,
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Head of Cadre and Senior Economic Adviser overseeing Ministry-wide competency intelligence and official statistics modernization."
  }
];
