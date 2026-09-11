import { db } from '../data/db.js';

export const reportService = {
  getReportsCatalog: async () => {
    return db.reportsCatalog;
  },

  getCompetencyReport: async () => {
    return {
      reportTitle: "Official Statistics System Competency Matrix 2026",
      generatedAt: new Date().toISOString(),
      ministry: "Ministry of Statistics & Programme Implementation (MoSPI)",
      domainOverview: db.competencies,
      activeCompetenciesCount: db.competenciesList.length,
      sampleFormat: "CSV / JSON",
      data: db.competenciesList.map(c => ({
        id: c.id,
        name: c.name,
        domain: c.domain,
        cadreTargetLevel: c.targetLevel,
        currentDemonstratedAverage: c.currentLevel
      }))
    };
  },

  getTrainingComplianceReport: async () => {
    return {
      reportTitle: "ACBP Mandatory Training Compliance Report",
      generatedAt: new Date().toISOString(),
      headcount: db.adminWorkforceData.totalEmployeesTracked,
      complianceRate: db.adminWorkforceData.complianceRate,
      divisionMetrics: db.adminWorkforceData.divisionMetrics
    };
  }
};
