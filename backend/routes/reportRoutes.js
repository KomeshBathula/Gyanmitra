import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    reports: [
      { id: "rep-1", title: "Annual Capacity Building Plan (ACBP) 2026 Compliance Audit", code: "REP-MOSPI-ACBP-2026-Q3", format: "PDF" },
      { id: "rep-2", title: "National Statistical Cadre Skill Gap Intelligence Report", code: "REP-NSSTA-GAP-2026-08", format: "PDF" },
      { id: "rep-3", title: "iGOT Karmayogi Course Completion & Credit Roster", code: "REP-IGOT-ROSTER-2026-M8", format: "CSV" }
    ]
  });
});

export default router;
