/**
 * Official System Notifications & Real-Time Alerts
 */

export const mockNotifications = [
  {
    id: "notif-1",
    title: "High-Priority Skill Bridge Recommended",
    description: "Your demonstrated competency in Python indicates a gap for your statistical role. NSSTA Course 'Python for Microdata' has been prioritized.",
    time: "10 mins ago",
    priority: "high",
    read: false,
    actionLink: "learning-path",
    date: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: "notif-2",
    title: "NSSTA Greater Noida Workshop Nomination Open",
    description: "Nominations for 'Advanced Sampling Methods & Complex Survey Vectorization' are closing soon on 30 Sep 2026.",
    time: "2 hours ago",
    priority: "high",
    read: false,
    actionLink: "marketplace",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "notif-3",
    title: "ACBP Quarterly Competency Review Completed",
    description: "Your overall competency score increased by +8% following successful verification of foundation modules.",
    time: "1 day ago",
    priority: "medium",
    read: true,
    actionLink: "competencies",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "notif-4",
    title: "Annual Performance Appraisal (APAR) Linked Courses Ready",
    description: "3 mandatory ACBP modules for the current financial year are ready for self-paced completion.",
    time: "3 days ago",
    priority: "medium",
    read: true,
    actionLink: "courses",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];
