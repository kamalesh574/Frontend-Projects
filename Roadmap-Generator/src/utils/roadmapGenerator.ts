import { Roadmap, RoadmapModule, RoadmapNode, DifficultyLevel, LearningStyle, LearningGoal } from '../types';

const MOCK_RESOURCES = [
  { title: 'Official Documentation', url: 'https://docs.example.com', type: 'article' as const },
  { title: 'Complete Guide on YouTube', url: 'https://youtube.com', type: 'video' as const },
  { title: 'Interactive Practice Lab', url: 'https://practice.example.com', type: 'practice' as const },
  { title: 'Advanced Masterclass', url: 'https://course.example.com', type: 'course' as const },
];

const SKILL_TEMPLATES: Record<string, string[]> = {
  'Frontend Development': [
    'HTML5 & Semantic Web', 'CSS3 Advanced Layouts', 'JavaScript ES6+', 'React Fundamentals',
    'State Management', 'API Integration', 'Testing & Debugging', 'Performance Optimization',
    'Deployment & CI/CD', 'Web Accessibility'
  ],
  'Backend Development': [
    'Node.js Core', 'Express.js Framework', 'Database Design (SQL/NoSQL)', 'RESTful API Design',
    'Authentication & JWT', 'Middleware & Security', 'Microservices Architecture', 'Caching with Redis',
    'Docker & Containerization', 'Serverless Functions'
  ],
  'Full Stack Development': [
    'Frontend Basics', 'Backend Basics', 'Database Integration', 'Full Stack Authentication',
    'State Management', 'API Design', 'Real-time Apps with WebSockets', 'Cloud Deployment',
    'System Design', 'DevOps Basics'
  ],
  'Python Developer': [
    'Python Syntax & Data Types', 'Functional Programming', 'Object-Oriented Python', 'File I/O & Modules',
    'Data Analysis with Pandas', 'Web Scraping', 'Django/Flask Web Dev', 'Automation Scripts',
    'Unit Testing', 'API Development'
  ],
  'Data Science': [
    'Statistics & Probability', 'Python for Data Science', 'Data Cleaning & Preprocessing', 'Exploratory Data Analysis',
    'Linear Regression', 'Classification Algorithms', 'Clustering', 'Data Visualization',
    'Deep Learning Basics', 'Model Deployment'
  ],
  'UI/UX Design': [
    'Design Principles', 'User Research', 'Wireframing', 'Prototyping in Figma',
    'Color Theory', 'Typography', 'Interaction Design', 'Usability Testing',
    'Design Systems', 'Handoff to Developers'
  ],
};

export const generateRoadmap = (
  skill: string,
  difficulty: DifficultyLevel,
  duration: number,
  style: LearningStyle,
  goal: LearningGoal
): Roadmap => {
  const topics = SKILL_TEMPLATES[skill] || [
    'Fundamentals', 'Intermediate Concepts', 'Advanced Techniques', 'Project Building', 'Optimization', 'Best Practices'
  ];

  const weeks = Math.ceil(duration / 7);
  const topicsPerWeek = Math.ceil(topics.length / weeks);

  const modules: RoadmapModule[] = [];

  for (let i = 0; i < weeks; i++) {
    const weekTopics = topics.slice(i * topicsPerWeek, (i + 1) * topicsPerWeek);
    const nodes: RoadmapNode[] = weekTopics.map((topic, index) => ({
      id: `node-${i}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      title: topic,
      description: `Deep dive into ${topic} with focus on ${goal.toLowerCase()} outcomes.`,
      estimatedHours: difficulty === DifficultyLevel.BEGINNER ? 4 : difficulty === DifficultyLevel.INTERMEDIATE ? 6 : 8,
      resources: MOCK_RESOURCES.sort(() => 0.5 - Math.random()).slice(0, 2),
      isCompleted: false,
    }));

    modules.push({
      id: `module-${i}`,
      title: `Week ${i + 1}: ${weekTopics[0] || 'Continuing Journey'}`,
      week: i + 1,
      nodes,
    });
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    skillName: skill,
    difficulty,
    duration,
    learningStyle: style,
    goal,
    modules,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const SKILL_SUGGESTIONS = Object.keys(SKILL_TEMPLATES);
