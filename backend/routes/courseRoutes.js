import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/courses - Explore all contents with filtering & sorting
router.get('/', (req, res) => {
  const { category, sector, subSector, search, sortBy } = req.query;
  let items = [...db.coursesCatalog];

  // Category filter
  if (category && category !== 'all') {
    items = items.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  // Sector filter
  if (sector && sector !== 'all') {
    items = items.filter(c => c.sector.toLowerCase() === sector.toLowerCase());
  }

  // Sub-sector filter
  if (subSector && subSector !== 'all') {
    items = items.filter(c => c.subSector.toLowerCase() === subSector.toLowerCase());
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortBy === 'popular') {
    items.sort((a, b) => b.karmaPoints - a.karmaPoints);
  } else if (sortBy === 'az') {
    items.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default newest
    items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  res.json({
    success: true,
    totalIndexed: 9159,
    count: items.length,
    data: items
  });
});

// GET /api/courses/:id - Course detail by ID
router.get('/:id', (req, res) => {
  const course = db.coursesCatalog.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  res.json({ success: true, data: course });
});

// GET /api/courses/marketplace/providers - iGOT Marketplace Providers
router.get('/marketplace/providers', (req, res) => {
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
  res.json({ success: true, count: providers.length, data: providers });
});

// GET /api/courses/marketplace/ar - Augmented Reality Modules
router.get('/marketplace/ar', (req, res) => {
  res.json({ success: true, count: db.marketplaceAR.length, data: db.marketplaceAR });
});

// GET /api/courses/my-learning - User's enrolled, completed, and unenrolled courses
router.get('/my-learning/all', (req, res) => {
  const { status } = req.query; // 'inprogress', 'completed', 'unenrolled'
  if (status === 'completed') {
    return res.json({ success: true, count: db.completedCourses.length, data: db.completedCourses });
  }
  if (status === 'unenrolled') {
    return res.json({ success: true, count: db.unenrolledCourses.length, data: db.unenrolledCourses });
  }
  // Default inprogress
  res.json({
    success: true,
    inprogress: db.myLearningCourses,
    completed: db.completedCourses,
    unenrolled: db.unenrolledCourses
  });
});

// POST /api/courses/enroll - Enroll in a course
router.post('/enroll', (req, res) => {
  const { courseId, title, provider, duration, level } = req.body;
  const newCourse = {
    id: `ml-${Date.now()}`,
    title: title || 'New Enrolled Course',
    provider: provider || 'iGOT Karmayogi',
    type: 'Course',
    level: level || 'Beginner',
    duration: duration || '1h 00m',
    progress: 0,
    isRetired: false,
    status: 'inprogress',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
    thumbnailText: title || 'New Course',
    thumbnailSub: provider || 'iGOT Karmayogi',
    syllabus: [
      'Module 1: Orientation and Introduction',
      'Module 2: Core Practical Concepts',
      'Module 3: Case Studies & Government Applications',
      'Module 4: Final Certification Assessment'
    ]
  };

  db.myLearningCourses.push(newCourse);
  res.json({
    success: true,
    message: `Enrolled successfully in ${newCourse.title}`,
    data: newCourse
  });
});

// PUT /api/courses/progress - Update progress in a course
router.put('/progress', (req, res) => {
  const { courseId, progress } = req.body;
  const course = db.myLearningCourses.find(c => c.id === courseId);
  if (course) {
    course.progress = Math.min(100, Math.max(0, progress));
    if (course.progress === 100) {
      course.status = 'completed';
      course.completedOn = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      // move to completed
      db.completedCourses.push(course);
    }
    return res.json({ success: true, message: 'Progress updated', data: course });
  }
  res.status(404).json({ success: false, message: 'Course not found' });
});

export default router;
