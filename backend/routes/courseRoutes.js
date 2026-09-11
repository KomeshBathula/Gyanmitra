import express from 'express';
import { mockIgotAdapter } from '../integrations/igot/mockIgotAdapter.js';
import { learningService } from '../services/learningService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/courses - Explore all contents with filtering & sorting
router.get('/', async (req, res, next) => {
  try {
    const result = await mockIgotAdapter.searchCourses(req.query);
    return res.json({
      success: true,
      totalIndexed: 9159,
      count: result.courses.length,
      data: result.courses
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/search - Dedicated search endpoint
router.get('/search', async (req, res, next) => {
  try {
    const { q, ...rest } = req.query;
    const result = await mockIgotAdapter.searchCourses({ search: q, ...rest });
    return successResponse(res, result.courses, `Found ${result.courses.length} courses matching search`);
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/marketplace/providers - iGOT Marketplace Providers
router.get('/marketplace/providers', async (req, res, next) => {
  try {
    const { search } = req.query;
    let providers = [...db.marketplaceProviders];
    if (search) {
      const q = search.toLowerCase();
      providers = providers.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return res.json({ success: true, count: providers.length, data: providers });
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/marketplace/ar - Augmented Reality Modules
router.get('/marketplace/ar', async (req, res, next) => {
  try {
    return res.json({ success: true, count: db.marketplaceAR.length, data: db.marketplaceAR });
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/my-learning - User's enrolled learning modules
router.get('/my-learning', async (req, res, next) => {
  try {
    const learningData = await learningService.getMyLearning(req.query.status);
    return res.json({ success: true, data: learningData });
  } catch (err) {
    next(err);
  }
});

// GET /api/courses/my-learning/all - Direct multi-status compatibility
router.get('/my-learning/all', async (req, res, next) => {
  try {
    const learningData = await learningService.getMyLearning(req.query.status);
    return res.json({
      success: true,
      ...learningData,
      data: learningData
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/courses/enroll or POST /api/courses/:id/enroll - Course enrollment
const handleEnroll = async (req, res, next) => {
  try {
    const courseId = req.params.id || req.body.courseId || req.body.id;
    const enrollResult = await mockIgotAdapter.enrollCourse(req.user?._id || "usr_001", courseId, req.body);
    return res.json({
      success: true,
      message: enrollResult.message,
      data: enrollResult.enrollment
    });
  } catch (err) {
    next(err);
  }
};
router.post('/enroll', handleEnroll);
router.post('/:id/enroll', handleEnroll);

// PUT /api/courses/progress or PUT /api/courses/:id/progress - Course progress update
const handleProgress = async (req, res, next) => {
  try {
    const courseId = req.params.id || req.body.courseId || req.body.id;
    const progress = req.body.progress ?? 0;
    const updated = await learningService.updateCourseProgress(courseId, progress);
    if (!updated) {
      return errorResponse(res, "Course not found in user's enrolled learning ledger", null, 404);
    }
    return res.json({
      success: true,
      message: "Progress updated in Karmayogi learning ledger",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};
router.put('/progress', handleProgress);
router.put('/:id/progress', handleProgress);

// GET /api/courses/:id - Course detail by ID
router.get('/:id', async (req, res, next) => {
  try {
    const course = await mockIgotAdapter.getCourseDetails(req.params.id);
    if (!course) {
      return errorResponse(res, "Course not found", "Not Found", 404);
    }
    return res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
});

export default router;
