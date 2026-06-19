/**
 * =============================================================================
 * PORTFOLIO DATA — EDIT EVERYTHING HERE
 * =============================================================================
 *
 * This is the ONLY file you need to change to update site content.
 * Save the file → refresh the browser (or redeploy on Vercel).
 *
 * WHERE EACH SECTION APPEARS ON THE WEBSITE:
 * ───────────────────────────────────────────
 * personalData     → Home hero, About Me, Contact
 * projects         → Projects Gallery → pick a category → project cards + hover popup
 * experience       → Experience → Teams or Internships
 * skills           → Skills node (all entries shown as bars)
 * navNodes         → Main grid node labels & positions (advanced — usually leave as-is)
 *
 * QUICK EDITS:
 * ────────────
 * • Name / job title / email / links  → personalData
 * • Your photo                         → put image in public/ folder, set personalData.portrait
 * • Add a project                      → push object to projects[] with category:
 *                                        'hardware' | 'cad' | 'autonomous'
 * • Add team role                      → push to experience[] with type: 'team'
 * • Add internship                     → push to experience[] with type: 'internship'
 * • Add a skill                        → push to skills[] (level = 0–100)
 *
 * =============================================================================
 */

export type ProjectSpec = {
  id: string;
  title: string;
  category: 'cad' | 'autonomous' | 'hardware';
  complexity: number;
  maxComplexity: number;
  software: string[];
  manufacturing: string[];
  components: string[];
  description: string;
};

export type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  period: string;
  type: 'team' | 'internship';
};

export type SkillModule = {
  id: string;
  name: string;
  level: number;
  category: string;
};

/** Home hero, About Me, and Contact — edit your identity here */
export const personalData = {
  name: 'Hazijul Haque',
  title: 'Electronics & Robotics Engineer',
  tagline: 'Bridging cyber-physical systems with precision hardware & autonomous code',
  bio: [
    'SPECIALIZATION: Robotics · CAD · Embedded Systems',
    'FOCUS: Cyber-Physical Integration',
    'STATUS: Active Development',
    'LOCATION: Workshop Node Alpha-7',
  ],
  /** Path from public/ folder, e.g. '/portrait.jpg' or '/portrait.svg' */
  portrait: '/portrait.svg',
  email: 'you@email.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

/** Projects — each item appears under its category in Projects Gallery */
export const projects: ProjectSpec[] = [
  {
    id: 'robotic-arm',
    title: '6-DOF Robotic Arm Base',
    category: 'cad',
    complexity: 4,
    maxComplexity: 5,
    software: ['SolidWorks', 'Fusion 360'],
    manufacturing: ['SLA 3D Printing', 'CNC'],
    components: ['NEMA 23 motors', 'Thrust bearings', 'Harmonic drive'],
    description: 'Precision articulated manipulator with carbon-fiber forearm segments.',
  },
  {
    id: 'Mobile robotic-arm',
    title: '6-DOF Mobile Robotic Arm Base',
    category: 'cad',
    complexity: 4,
    maxComplexity: 5,
    software: ['SolidWorks', 'Fusion 360'],
    manufacturing: ['SLA 3D Printing', 'CNC'],
    components: ['NEMA 23 motors', 'Thrust bearings', 'Harmonic drive'],
    description: 'Precision articulated manipulator with carbon-fiber forearm segments.',
  },
  {
    id: 'cnc-chassis',
    title: 'CNC-Milled Chassis Frame',
    category: 'cad',
    complexity: 3,
    maxComplexity: 5,
    software: ['Fusion 360', 'Mastercam'],
    manufacturing: ['CNC Aluminum', 'Anodizing'],
    components: ['T-slot extrusion', 'Linear rails', 'Timing belts'],
    description: 'Modular T-slot aluminum frame for rapid prototyping assemblies.',
  },
  {
    id: 'autonomous-nav',
    title: 'Autonomous Navigation Stack',
    category: 'autonomous',
    complexity: 5,
    maxComplexity: 5,
    software: ['ROS 2', 'Python', 'C++'],
    manufacturing: ['PCB Assembly', 'Sensor integration'],
    components: ['LiDAR', 'IMU', 'Jetson Orin'],
    description: 'Real-time SLAM with path planning for mobile robotics platforms.',
  },
  {
    id: 'embedded-control',
    title: 'Embedded Motor Controller',
    category: 'autonomous',
    complexity: 4,
    maxComplexity: 5,
    software: ['C', 'FreeRTOS', 'KiCad'],
    manufacturing: ['PCB Fab', 'SMT Assembly'],
    components: ['STM32F4', 'DRV8825', 'CAN bus'],
    description: 'Closed-loop BLDC control with field-oriented control algorithms.',
  },
  {
    id: 'arc-reactor-pcb',
    title: 'Custom Power Distribution Board',
    category: 'hardware',
    complexity: 3,
    maxComplexity: 5,
    software: ['KiCad', 'LTspice'],
    manufacturing: ['PCB Fab', 'Hand solder'],
    components: ['Buck converters', 'Fuses', 'XT60 connectors'],
    description: 'Multi-rail power board for workshop robotics testbed.',
  },
];

/** Experience — type 'team' → Teams hub | type 'internship' → Internships hub */
export const experience: ExperienceEntry[] = [
  {
    id: 'team-robotics',
    title: 'Lead Mechanical Designer',
    org: 'University Robotics Team',
    period: '2024 – Present',
    type: 'team',
  },
  {
    id: 'team-fsa',
    title: 'Suspension Engineer',
    org: 'Formula Student Team',
    period: '2023 – 2024',
    type: 'team',
  },
  {
    id: 'intern-robotics',
    title: 'Robotics Engineering Intern',
    org: 'Example Robotics Ltd.',
    period: 'Summer 2024',
    type: 'internship',
  },
  {
    id: 'intern-embedded',
    title: 'Embedded Systems Intern',
    org: 'Example Electronics Co.',
    period: 'Summer 2023',
    type: 'internship',
  },
];

/** Skills — all entries render on the Skills page (level 0–100) */
export const skills: SkillModule[] = [
  { id: 'sw', name: 'SolidWorks / Fusion 360', level: 90, category: 'CAD' },
  { id: 'ros', name: 'ROS 2 / Python', level: 85, category: 'Software' },
  { id: 'cnc', name: 'CNC Machining', level: 75, category: 'Manufacturing' },
  { id: 'pcb', name: 'PCB Design', level: 70, category: 'Electronics' },
  { id: 'embedded', name: 'Embedded C / RTOS', level: 80, category: 'Firmware' },
];

export type NodeId =
  | 'home'
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'contact'
  | 'hardware-builds'
  | 'cad-mechanical'
  | 'autonomous-code'
  | 'teams'
  | 'internships';

export type NavNode = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  parent?: NodeId;
};

/** Main navigation grid — only edit labels if you rename sections */
export const navNodes: NavNode[] = [
  { id: 'home', label: 'Home / Hero', x: 50, y: 28 },
  { id: 'about', label: 'About Me', x: 14, y: 52, parent: 'home' },
  { id: 'projects', label: 'Projects Gallery', x: 32, y: 52, parent: 'home' },
  { id: 'experience', label: 'Experience', x: 50, y: 52, parent: 'home' },
  { id: 'skills', label: 'Skills', x: 68, y: 52, parent: 'home' },
  { id: 'contact', label: 'Contact', x: 86, y: 52, parent: 'home' },
];

export const connections: [NodeId, NodeId][] = [
  ['home', 'about'],
  ['home', 'projects'],
  ['home', 'experience'],
  ['home', 'skills'],
  ['home', 'contact'],
];

export type ProjectCategoryId = 'hardware-builds' | 'cad-mechanical' | 'autonomous-code';
export type ExperienceCategoryId = 'teams' | 'internships';

export const projectCategories: {
  id: ProjectCategoryId;
  label: string;
  icon: string;
  dataCategory: ProjectSpec['category'];
  description: string;
}[] = [
  {
    id: 'hardware-builds',
    label: 'Hardware Builds',
    icon: '▣',
    dataCategory: 'hardware',
    description: 'PCBs, power systems, and physical hardware assemblies',
  },
  {
    id: 'cad-mechanical',
    label: 'CAD / Mechanical',
    icon: '⚙',
    dataCategory: 'cad',
    description: 'Robotic arms, chassis frames, and precision mechanical design',
  },
  {
    id: 'autonomous-code',
    label: 'Autonomous / Code',
    icon: '⬡',
    dataCategory: 'autonomous',
    description: 'Navigation stacks, embedded control, and autonomous systems',
  },
];

export const experienceCategories: {
  id: ExperienceCategoryId;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: 'teams',
    label: 'Teams',
    icon: '◈',
    description: 'Competition teams and collaborative engineering roles',
  },
  {
    id: 'internships',
    label: 'Internships',
    icon: '◇',
    description: 'Industry placements and professional experience',
  },
];

/** Count helpers used by category cards — no need to edit */
export function countProjectsByCategory(category: ProjectSpec['category']) {
  return projects.filter((p) => p.category === category).length;
}

export function countExperienceByType(type: ExperienceEntry['type']) {
  return experience.filter((e) => e.type === type).length;
}
