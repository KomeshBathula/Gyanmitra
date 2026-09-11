import express from 'express';

const router = express.Router();

router.get('/workforce-intelligence', (req, res) => {
  res.json({
    success: true,
    totalEmployees: "12,450",
    nationalAvgCompetency: "72.4%",
    criticalGapsCount: 8,
    acbpComplianceRate: "78.2%",
    divisions: [
      { name: "Field Operations Division (FOD)", employees: 4850, avgCompetency: 71, completion: "82%" },
      { name: "Survey Design & Research Div (SDRD)", employees: 1240, avgCompetency: 78, completion: "88%" },
      { name: "Data Quality Assurance Div (DQAD)", employees: 1980, avgCompetency: 69, completion: "74%" },
      { name: "Central Statistics Office (CSO)", employees: 890, avgCompetency: 84, completion: "91%" },
      { name: "State DES Cadres", employees: 3490, avgCompetency: 64, completion: "68%" }
    ]
  });
});

export default router;
