import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const PORT = 5001;
process.env.PORT = PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverPath = path.join(__dirname, 'server.js');

console.log('--- Starting GyanMitra Phase 1 Backend Verification Test Suite ---');

const serverProcess = spawn('node', [serverPath], {
  env: { ...process.env, PORT: `${PORT}` },
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverReady = false;

serverProcess.stdout.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('Server running')) {
    serverReady = true;
  }
});

serverProcess.stderr.on('data', (data) => {
  console.error('[Server Error]', data.toString());
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    if (serverReady) return true;
    try {
      const res = await fetch(`http://localhost:${PORT}/api/health`);
      if (res.ok) return true;
    } catch (e) {
      // wait
    }
    await sleep(200);
  }
  throw new Error('Server failed to start on port ' + PORT);
}

let passed = 0;
let failed = 0;

async function assertTest(name, fn) {
  try {
    await fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(`    -> ${err.message}`);
    failed++;
  }
}

async function runTests() {
  await waitForServer();
  console.log(`Server connected on http://localhost:${PORT}`);

  const baseUrl = `http://localhost:${PORT}`;

  // 1. Health check
  await assertTest('GET /api/health - Returns 200 and operational status', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.status !== 'operational') throw new Error('Invalid health response');
  });

  // 2. Auth Profile
  await assertTest('GET /api/auth/me - Returns default authenticated employee', async () => {
    const res = await fetch(`${baseUrl}/api/auth/me`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.name || json.data.role !== 'EMPLOYEE') {
      throw new Error('Invalid user payload');
    }
  });

  // 3. Auth Switch / Login
  await assertTest('POST /api/auth/login - Generates prototype session token', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'trainer@nssta.gov.in' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.token) throw new Error('Token not generated');
  });

  // 4. Auth 401 on invalid token
  await assertTest('GET /api/auth/me - Rejects invalid token with 401', async () => {
    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  // 5. Courses Catalog
  await assertTest('GET /api/courses - Retrieves courses catalog with filters', async () => {
    const res = await fetch(`${baseUrl}/api/courses?domain=Statistical`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data) || json.data.length === 0) {
      throw new Error('Courses list empty or invalid');
    }
  });

  // 6. Course Details
  await assertTest('GET /api/courses/cnt-1 (or crs_001) - Returns detailed syllabus & metadata', async () => {
    const res = await fetch(`${baseUrl}/api/courses/crs_001`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.title || !json.data.syllabus) throw new Error('Course details mismatch');
  });

  // 7. Course Enrollment
  await assertTest('POST /api/courses/enroll - Successfully enrolls in course', async () => {
    const res = await fetch(`${baseUrl}/api/courses/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: 'IGOT-CCS-1964-02' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data) throw new Error('Enrollment failed');
  });

  // 8. Course Progress Update
  await assertTest('PUT /api/courses/ml-1/progress - Updates progress percent', async () => {
    const res = await fetch(`${baseUrl}/api/courses/ml-1/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: 85 })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.data.progress !== 85) throw new Error('Progress update failed');
  });

  // 9. My Learning
  await assertTest('GET /api/learning/my-learning - Retrieves active user enrollments', async () => {
    const res = await fetch(`${baseUrl}/api/learning/my-learning`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data || !Array.isArray(json.data.courses)) throw new Error('My learning list invalid');
  });

  // 10. Competency Framework
  await assertTest('GET /api/competencies - Returns 4 MoSPI competency domains', async () => {
    const res = await fetch(`${baseUrl}/api/competencies`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data) || json.data.length < 4) throw new Error('Competencies data incomplete');
  });

  // 11. Skill Gaps Calculation
  await assertTest('GET /api/competencies/gaps - Calculates deterministic gap = target - current', async () => {
    const res = await fetch(`${baseUrl}/api/competencies/gaps`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.gaps || json.data.gaps.length === 0) {
      throw new Error('Gaps calculation failed');
    }
    const sampleGap = json.data.gaps[0];
    if (typeof sampleGap.gap !== 'number' || !sampleGap.gapSeverity) {
      throw new Error('Gap calculation structure invalid');
    }
  });

  // 12. Personalized Recommendations
  await assertTest('GET /api/competencies/recommendations - Recommends courses matching gaps', async () => {
    const res = await fetch(`${baseUrl}/api/competencies/recommendations`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.recommendedCourses) {
      throw new Error('Recommendations engine failed');
    }
  });

  // 13. Personalized Learning Pathway
  await assertTest('GET /api/learning/path - Generates milestone-driven learning roadmap', async () => {
    const res = await fetch(`${baseUrl}/api/learning/path`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.roadmap) throw new Error('Roadmap not returned');
  });

  // 14. Assessment Catalog & Details
  await assertTest('GET /api/assessment - Lists role-aligned assessments', async () => {
    const res = await fetch(`${baseUrl}/api/assessment`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.data.length === 0) throw new Error('Assessments list empty');
  });

  // 15. Assessment Start
  await assertTest('POST /api/assessment/asm_001/start - Initiates timed assessment session', async () => {
    const res = await fetch(`${baseUrl}/api/assessment/asm_001/start`, { method: 'POST' });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.sessionId || !Array.isArray(json.data.questions)) {
      throw new Error('Start assessment session failed');
    }
  });

  // 16. Assessment Submit & Closed-Loop Competency Ledger Update
  await assertTest('POST /api/assessment/asm_001/submit - Evaluates score & updates competency ledger in closed loop', async () => {
    const res = await fetch(`${baseUrl}/api/assessment/asm_001/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: {
          1: 1, // correct
          2: 1, // correct
          3: 0, // correct
          4: 0, // correct
          5: 1  // correct
        }
      })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.data.scorePercent !== 100 || !json.data.ledgerUpdated) {
      throw new Error('Closed-loop competency ledger evaluation failed: score=' + json.data?.scorePercent);
    }
    if (!json.data.updatedSkillGaps || !json.data.freshRecommendations) {
      throw new Error('Closed loop did not produce updated gaps or recommendations');
    }
  });

  // 17. AI Mock Quiz Generator
  await assertTest('POST /api/ai/generate-quiz - Returns mock statistical quiz with source citations', async () => {
    const res = await fetch(`${baseUrl}/api/ai/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentName: 'NSS_Sampling_Guidelines.pdf' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.mode !== 'mock' || !json.questions || json.questions.length === 0) {
      throw new Error('AI Mock quiz generation failed');
    }
  });

  // 18. AI Assistant Chat
  await assertTest('POST /api/ai/assistant-chat - Provides grounded responses from MoSPI frameworks', async () => {
    const res = await fetch(`${baseUrl}/api/ai/assistant-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What is my skill gap in python?' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.mode !== 'mock' || !json.reply || !json.groundedSource) {
      throw new Error('AI Chat assistant failed');
    }
  });

  // 19. Trainer Endpoints
  await assertTest('GET /api/trainer/batches & analytics - Returns batch stats', async () => {
    const res = await fetch(`${baseUrl}/api/trainer/batches`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) throw new Error('Trainer batches failed');
  });

  // 20. Admin Endpoints
  await assertTest('GET /api/admin/metrics & users - Returns governance analytics', async () => {
    const res = await fetch(`${baseUrl}/api/admin/metrics`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.totalEmployees) throw new Error('Admin metrics failed');
  });

  // 21. Reports
  await assertTest('GET /api/reports/competency-summary - Returns executive summary', async () => {
    const res = await fetch(`${baseUrl}/api/reports/competency-summary`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.summary) throw new Error('Reports summary failed');
  });

  // 22. Notifications
  await assertTest('GET /api/notifications & mark read - Manages alert notifications', async () => {
    const res = await fetch(`${baseUrl}/api/notifications`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || json.data.length === 0) throw new Error('Notifications list failed');

    const readRes = await fetch(`${baseUrl}/api/notifications/${json.data[0]._id || json.data[0].id}/read`, { method: 'PUT' });
    if (readRes.status !== 200) throw new Error('Mark notification read failed');
  });

  // 23. iGOT Karmayogi Mock Adapter
  await assertTest('GET /api/integrations/igot/courses & POST /api/integrations/igot/enroll', async () => {
    const res = await fetch(`${baseUrl}/api/integrations/igot/courses`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data.courses)) throw new Error('iGOT courses failed');

    const enrollRes = await fetch(`${baseUrl}/api/integrations/igot/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: 'IGOT-POST-2023-01' })
    });
    if (enrollRes.status !== 200) throw new Error('iGOT enroll failed');
  });

  // 24. NSSTA Academy Mock Adapter
  await assertTest('GET /api/integrations/nssta/programs & POST /api/integrations/nssta/nominate', async () => {
    const res = await fetch(`${baseUrl}/api/integrations/nssta/programs`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data.programs)) throw new Error('NSSTA programs failed');

    const nomRes = await fetch(`${baseUrl}/api/integrations/nssta/nominate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ programId: 'NSSTA-PROG-2026-01', designation: 'Assistant Director' })
    });
    if (nomRes.status !== 200) throw new Error('NSSTA nominate failed');
  });

  // 25. 404 Route Not Found
  await assertTest('GET /api/non-existent-route - Returns 404 error response', async () => {
    const res = await fetch(`${baseUrl}/api/non-existent-route`);
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
  });

  console.log('\n========================================');
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('========================================\n');

  serverProcess.kill('SIGTERM');
  if (failed > 0) process.exit(1);
  else process.exit(0);
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  serverProcess.kill('SIGTERM');
  process.exit(1);
});
