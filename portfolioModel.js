import { Project } from './projectModel'

/**
 * Portfolio Data Model Repository
 * Single Source of Truth for all personal, project, skill, and academic data.
 */

export const profileModel = {
  name: 'Lawrence AJ Famadulan',
  role: 'Web Developer & Designer',
  headline: 'Aimed Tech Stack',
  bio: 'I am a college student exploring web development and technology through the projects I create. I enjoy turning ideas and everyday problems into simple, functional, and user-friendly digital solutions. I’m still learning, experimenting, and improving with every project, and this portfolio is a collection of the things I’ve built along the way.',
  avatar: '/assets/images/profile.png',
  email: 'lawrence@example.com',
  location: 'College Campus / Remote',
  socials: [
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: 'instagram'
    },
    {
      name: 'Twitter / X',
      url: 'https://x.com',
      icon: 'twitter'
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github'
    }
  ],
  techStacks: [
    'HTML5',
    'CSS3',
    'JavaScript (ES6+)',
    'Vue.js 3',
    'Tailwind CSS',
    'PHP',
    'MySQL',
    'Node.js',
    'Express.js',
    'TypeScript',
    'RESTful APIs',
    'Git & GitHub',
    'Responsive Web Design',
    'PostgreSQL',
    'Figma UI/UX',
    'Vite'
  ],
  get specializationBadges() {
    return this.techStacks
  }
}

export const projectCategories = ['All', 'Web', 'School', 'Personal', 'UI/UX']

/**
 * ============================================================================
 * 📝 PROJECTS TEMPLATE (LETTERS ONLY / READY FOR YOUR OWN PROJECTS)
 * ============================================================================
 * You can easily add, edit, or remove projects below.
 * - `initials`: 2-3 letters displayed on the card (e.g. '01', 'SE', 'APP', 'WEB')
 * - `image`: Leave as '' to use the letters-only typography card banner.
 *            Or specify an image path (e.g., '/assets/images/my-project.png').
 * ============================================================================
 */
export const initialProjects = [
  new Project({
    id: 'aj-cj-mangaka',
    name: 'AJ&CJ MANGAKA',
    category: 'Web',
    initials: 'AM', // Initials shown on the card
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '', // '' uses letters-only typography banner
    description: 'An online e-commerce website created for buying manga and anime books online, featuring interactive product catalogs, book previews, and a responsive shopping experience.',
    features: [
      'Online manga & anime book catalog showcase',
      'Interactive shopping cart and order summary',
      'Search and category filtering by anime series',
      'Responsive design built with semantic HTML, CSS, and JavaScript'
    ],
    github: 'https://github.com',
    demo: '#'
  }),
  new Project({
    id: 'kurozen',
    name: 'Kurozen',
    category: 'Web',
    initials: 'KZ', // Letters shown on the card
    technologies: ['PHP', 'JavaScript', 'Vanilla CSS'],
    image: '', // '' uses letters-only typography banner
    description: 'An enterprise platform ready to be used by small businesses to streamline daily operations, workflows, and administrative management.',
    features: [
      'Turnkey business management and administrative workflows',
      'Robust backend logic and data handling with PHP',
      'Dynamic client-side interactivity using modern Vanilla JavaScript',
      'Clean, lightweight responsive styling with Vanilla CSS'
    ],
    github: 'https://github.com',
    demo: '#'
  }),
  new Project({
    id: 'personal-template-slot',
    name: '+ Add Your Project Here',
    category: 'Personal',
    initials: '+', // Letters/symbol shown on the card
    technologies: ['Your Tech 1', 'Your Tech 2', 'Your Tech 3'],
    image: '', // '' uses letters-only typography banner
    isTemplate: true,
    description: 'This slot is ready for your next personal project! Open src/models/portfolioModel.js and replace this with your own project title, description, and technologies.',
    features: [
      'Step 1: Replace name with your personal project title',
      'Step 2: Set your tech stack in the technologies array',
      'Step 3: Add your key features and description',
      'Step 4: Attach your GitHub repo link'
    ],
    github: '#'
  }),
  new Project({
    id: 'school-template-slot',
    name: '+ Add Your Project Here',
    category: 'School',
    initials: '+', // Letters/symbol shown on the card
    technologies: ['Your Tech 1', 'Your Tech 2', 'Your Tech 3'],
    image: '', // '' uses letters-only typography banner
    isTemplate: true,
    description: 'This slot is ready for your next school or academic project! Open src/models/portfolioModel.js and replace this with your course project, research, or system title.',
    features: [
      'Step 1: Replace name with your school project title',
      'Step 2: Set your tech stack in the technologies array',
      'Step 3: Add your key features and description',
      'Step 4: Attach your GitHub repo link'
    ],
    github: '#'
  }),
  new Project({
    id: 'uiux-template-slot',
    name: '+ Add Your Project Here',
    category: 'UI/UX',
    initials: '+', // Letters/symbol shown on the card
    technologies: ['Figma', 'Prototyping', 'Wireframing'],
    image: '', // '' uses letters-only typography banner
    isTemplate: true,
    description: 'This slot is ready for your next UI/UX design showcase! Open src/models/portfolioModel.js and replace this with your design case study or prototype.',
    features: [
      'Step 1: Replace name with your UI/UX design project title',
      'Step 2: Add your tools (Figma, Adobe XD, Prototyping)',
      'Step 3: Describe your design process and user flows',
      'Step 4: Attach your Figma prototype or live preview link'
    ],
    github: '#'
  })
]

export const skillCategories = [
  {
    title: 'Web Development',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    skills: [
      'HTML5 / CSS3',
      'JavaScript (ES6+)',
      'Vue.js 3',
      'Tailwind CSS',
      'PHP & MySQL',
      'Git & GitHub'
    ]
  },
  {
    title: 'UI/UX Design',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    skills: [
      'Figma Prototyping',
      'Responsive Web Design',
      'User Interface Design',
      'Design Systems',
      'Wireframing'
    ]
  },
  {
    title: 'Problem Solving',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    skills: [
      'Algorithms & Data Structures',
      'Debugging & Troubleshooting',
      'System Logic & Workflows',
      'Clean Code Practices'
    ]
  }
]

export const educationList = [
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'College / University Student',
    period: 'Present',
    description: 'Focusing on software development, web technologies, database management, and modern application design principles.'
  }
]

export const philosophyCards = [
  {
    title: 'Background & Philosophy',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    content: 'I enjoy turning ideas and everyday problems into simple, functional, and user-friendly digital solutions. Every project is an opportunity to learn, experiment, and refine my skills in software and web design.'
  },
  {
    title: 'Specializations & Learning',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    content: "My core areas of focus include Web Development, Problem Solving, and UI/UX Design. I'm constantly building and improving with every single project I undertake."
  }
]
