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
  portrait: '/portrait.svg',
  email: 'you@email.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

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
];

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

export const navNodes: NavNode[] = [
  { id: 'home', label: 'Home / Hero', x: 50, y: 14 },
  { id: 'about', label: 'About Me', x: 12, y: 30, parent: 'home' },
  { id: 'projects', label: 'Projects Gallery', x: 30, y: 30, parent: 'home' },
  { id: 'experience', label: 'Experience', x: 50, y: 30, parent: 'home' },
  { id: 'skills', label: 'Skills', x: 70, y: 30, parent: 'home' },
  { id: 'contact', label: 'Contact', x: 88, y: 30, parent: 'home' },
  { id: 'hardware-builds', label: 'Hardware Builds', x: 12, y: 48, parent: 'about' },
  { id: 'cad-mechanical', label: 'CAD / Mechanical', x: 24, y: 48, parent: 'projects' },
  { id: 'autonomous-code', label: 'Autonomous / Code', x: 36, y: 48, parent: 'projects' },
  { id: 'teams', label: 'Teams', x: 46, y: 64, parent: 'experience' },
  { id: 'internships', label: 'Internships', x: 58, y: 64, parent: 'experience' },
];

export const connections: [NodeId, NodeId][] = [
  ['home', 'about'],
  ['home', 'projects'],
  ['home', 'experience'],
  ['home', 'skills'],
  ['home', 'contact'],
  ['about', 'hardware-builds'],
  ['projects', 'cad-mechanical'],
  ['projects', 'autonomous-code'],
  ['experience', 'teams'],
  ['experience', 'internships'],
  ['about', 'projects'],
];
