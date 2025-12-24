import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Import the tripplanner image
import tripplannerImg from '@/assets/images/tripplanner.png';
import upskillImg from '@/assets/images/upskilllogo.png'; 
import geophoneImg from '@/assets/images/ML.jpeg'; 
import magicalBookImg from '@/assets/images/magicalbook.png';
import almaFlowersImg from '@/assets/images/almaflowers.png';
import flowChatImg from '@/assets/images/flowchat.png';
const projects = [
  {
    title: "Magical Book — AI book generator",
    description: "Turned a broken prototype into a working product. Focused on a clean structure, faster performance, and a simple, stable UX.",
    points: [
      "Rebuilt core parts and set up a clear, scalable structure.",
      "Reduced book generation time from 3+ minutes to under 30 seconds.",
      "Worked with two remote devs: tasks in Jira, reviews, and PRs.",
      "Built with Node.js API and React (Vite, TailwindCSS)."
    ],
    link: "https://www.magical-book.com/",
    color: "#4fd1c5",
    src: magicalBookImg,
    githubLink: null,
    liveLink: "https://www.magical-book.com/",
    tags: [
      "React",
      "Node.js",
      "MongoDB",

    ]
  },
  {
    title: "AlmaFlowers - E-commerce Platform",
    description: "Contributed development of 'Alma Flowers,' a complex e-commerce platform. My role focused on debugging, implementing critical fixes, and ensuring the application's stability and readiness for production.",
    points: [
      "Joined the project during a key phase to identify and resolve existing bugs in the full-stack application.",
      "Contributed to the development of both client-side components using React and server-side logic with Node.js.",
      "Worked with the existing database schema using PostgreSQL and Prisma to ensure data integrity and fix functionality issues.",
      "Helped stabilize the platform by troubleshooting and implementing necessary improvements to get the website fully operational."
    ],
    src: almaFlowersImg,
    link: "https://www.almaflowers.co.il/",
    color: "#27F53C",
    githubLink: null,
    liveLink: "https://www.almaflowers.co.il/",
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "E-commerce"
    ]
  },
  {
    title: "FlowChat - Chatbot for Customers Support",
    description: "Developed a chatbot for customers support using React, Node.js, and PostgreSQL. The chatbot is able to answer questions about the products and services offered by the company.",
    src: flowChatImg,
    link: "https://www.flowchat.biz/",
    color: "#27F53C",
    githubLink: null,
    liveLink: "https://www.flowchat.biz/",
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "OpenAI",
      "Chatbot"
    ]
  },
  {
    title: "AiTripPlanner — Full-stack AI-powered travel planner",
    description:
      "Built a scalable full-stack platform for generating AI-personalized itineraries using real-time data. Developed a dynamic chat assistant with context-aware editing and smart activity suggestions, improving user engagement. Achieved 60% backend cost savings via efficient prompt chaining and open-source AI integration. Delivered a live trip mode with real-time routing, activity tracking, and mobile-optimized UX. Containerized the app with Docker for fast deployment, portability, and consistent development environments.",
    src: tripplannerImg,
    link: tripplannerImg,
    color: "#2780F5",
    githubLink: "https://github.com/Lidorpahima/AiTripPlanner",
    liveLink: "https://www.aitripplanner.online/",
    tags: [
      "Django REST Framework",
      "Next.js",
      "TypeScript",
      "Redis",
      "PostgreSQL",
      "Docker",
      "JWT"
    ],
  },
  {
    title: "UPSKILL — AI-Powered Personalized Learning Platform",
    description:
      "UPSKILL is an AI-powered personalized learning platform that guides users from career path selection to skill acquisition. Features include AI-powered career guidance, personalized learning goals, career path planning, progress tracking, and a microservices architecture for scalability.",
    src: upskillImg,
    link: upskillImg,
    color: "#7c3aed",
    githubLink: "https://github.com/Lidorpahima/OpenSkill",
    liveLink: "",
    tags: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "OAuth2",
      "JWT",
      "Docker",
      "Microservices"
    ],
  },
  {
    title: "GeoSense — Geophone Event Classification with PyTorch CNN + Attention",
    description:
      "End-to-end pipeline for classifying geophone sensor events (car, human, nothing) using a custom PyTorch CNN with spatial attention. Includes advanced signal processing, data augmentation, and achieves 94.7% accuracy. Full pipeline: data loading, preprocessing, feature engineering, model training, and evaluation.",
    src: geophoneImg,
    link: geophoneImg,
    color: "#f59e42",
    githubLink: "https://github.com/Lidorpahima/GeoSense-AI-Human-Motion-Detection-with-Geophones",
    liveLink: "",
    tags: [
      "Python",
      "PyTorch",
      "SciPy",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Deep Learning"
    ],
  },
  
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.src}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                tags={project.tags}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
  tags,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Access the projects array length for arrow logic
  const projectsLength = projects.length;

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl mt-20 overflow-hidden shadow-xl">
          {/* Image section - full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden flex items-center justify-center bg-black">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-contain object-center"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {/* Colored overlay on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            {/* Project number */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>
              {/* Tags for technologies */}
              {tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-600/20 text-teal-300 border border-teal-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

              <div className="flex items-center gap-4">
                {/* GitHub Link (or Private Code label) */}
                {githubLink ? (
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Code
                    </span>
                  </motion.a>
                ) : (
                  <div className="flex items-center gap-2 opacity-70 cursor-not-allowed select-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span className="text-xs md:text-sm font-medium" style={{ color }}>
                      Private Code
                    </span>
                  </div>
                )}

                {/* Live Link */}
                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Live
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Down Arrow (not for last card) */}
        {i < projectsLength - 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <span className="text-teal-400 text-2xl flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        )}
        {/* Scroll Up Arrow (only for last card) */}
        {i === projectsLength - 1 && (
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-teal-400 text-2xl flex items-center justify-center">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Add PropTypes validation
Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string,
  liveLink: PropTypes.string.isRequired,
  tags: PropTypes.array,
};
