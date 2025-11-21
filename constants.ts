import { Job } from "./types";

export const APP_NAME = "RemoteNexus";
export const REMOTE_OK_API_URL = "https://remoteok.com/api";

// RemoteOK API often has CORS issues in browser-only environments.
// We provide a robust fallback dataset to ensure the UI works perfectly for demonstration.
export const FALLBACK_JOBS: Job[] = [
  {
    id: "101",
    slug: "senior-react-developer-techflow",
    company: "TechFlow",
    position: "Senior React Engineer",
    tags: ["react", "typescript", "tailwind", "frontend"],
    description: "<p>We are looking for a Senior React Engineer to lead our frontend initiatives. You will be working with a modern stack including Next.js, TypeScript, and Tailwind CSS.</p><br/><h3>Responsibilities:</h3><ul><li>Architect scalable UI components</li><li>Mentor junior developers</li><li>Collaborate with UX designers</li></ul>",
    url: "https://remoteok.com",
    apply_url: "https://remoteok.com",
    date: "2023-10-25T12:00:00",
    company_logo: "https://picsum.photos/100/100?random=1",
    location: "Worldwide",
    salary_min: 120000,
    salary_max: 160000
  },
  {
    id: "102",
    slug: "backend-go-developer-cloudscale",
    company: "CloudScale",
    position: "Backend Developer (Go)",
    tags: ["golang", "backend", "aws", "kubernetes"],
    description: "<p>Join our infrastructure team to build high-performance microservices.</p>",
    url: "https://remoteok.com",
    apply_url: "https://remoteok.com",
    date: "2023-10-24T10:00:00",
    company_logo: "https://picsum.photos/100/100?random=2",
    location: "Remote (US/EU)",
    salary_min: 130000,
    salary_max: 170000
  },
  {
    id: "103",
    slug: "product-designer-designify",
    company: "Designify",
    position: "Lead Product Designer",
    tags: ["design", "figma", "ui/ux", "product"],
    description: "<p>We need a visionary designer to shape the future of our creative tools.</p>",
    url: "https://remoteok.com",
    apply_url: "https://remoteok.com",
    date: "2023-10-23T15:30:00",
    company_logo: "https://picsum.photos/100/100?random=3",
    location: "Worldwide",
    salary_min: 90000,
    salary_max: 140000
  },
  {
    id: "104",
    slug: "fullstack-engineer-startuphub",
    company: "StartupHub",
    position: "Full Stack Engineer",
    tags: ["javascript", "node", "react", "startup"],
    description: "<p>Looking for a jack-of-all-trades to help us ship features fast.</p>",
    url: "https://remoteok.com",
    apply_url: "https://remoteok.com",
    date: "2023-10-22T09:00:00",
    company_logo: "https://picsum.photos/100/100?random=4",
    location: "Remote (APAC)",
    salary_min: 80000,
    salary_max: 120000
  },
  {
    id: "105",
    slug: "devops-specialist-securenet",
    company: "SecureNet",
    position: "DevOps Specialist",
    tags: ["devops", "security", "linux", "docker"],
    description: "<p>Ensure our systems are secure and reliable.</p>",
    url: "https://remoteok.com",
    apply_url: "https://remoteok.com",
    date: "2023-10-21T11:45:00",
    company_logo: "https://picsum.photos/100/100?random=5",
    location: "Worldwide",
    salary_min: 110000,
    salary_max: 150000
  }
];

export const POPULAR_TAGS = ["react", "javascript", "backend", "design", "devops", "marketing", "finance", "product"];