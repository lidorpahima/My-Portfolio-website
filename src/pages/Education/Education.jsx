import React, { useState } from "react";
import EducationLoader from "@/components/ui/EducationLoader";
import {
  Star,
  Award,
  Calendar,
  BookOpen,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
// Image imports for certifications
import udemyLogo from '@/assets/images/udemy-logo.png';
import codecademyLogo from '@/assets/images/codecademy-logo.png';
import kaggleLogo from '@/assets/images/kaggle-logo.png';
import programminghubLogo from '@/assets/images/programminghub-logo.png';
import gitCertificate from '@/assets/images/Git&GitHub_CERTIFICATE.png';
import sqlCertificate from '@/assets/images/SQL_Course.png';
import pythonCertificate from '@/assets/images/KiggleCertificate.jpg';
import javaCertificate from '@/assets/images/ProgHubCertificate.jpg';

const EducationSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const educationData = [
    {
      degree: "B.Sc. in Computer Science",
      school: "SCE - Shamoon College of Engineering",
      mascot: "🎓",
      year: "2021 - 2025",
      achievements: [
        "Major: Artificial Intelligence (AI)",
        "Benin Fellows Scholarship Recipient",
        "Expected Graduation: August 2025"
      ],
      skills: [
        "Machine Learning",
        "Data Structures",
        "Algorithms",
        "Software Engineering",
        "AI/ML",
        "Computer Vision"
      ],
      description:
        "Pursuing a comprehensive computer science education with a focus on artificial intelligence. Participating in the Benin Fellows STEM Program and enrichment workshops.",
    },
    
  ];

  const certificationsData = [
    {
      name: "The Complete Git Guide: Understand and master Git and GitHub",
      issuer: "Udemy",
      date: "May 2025",
      certNumber: null,
      skills: ["Git & GitHub"],
      logo: udemyLogo,
      certificateImage: gitCertificate,
    },
    {
      name: "SQL Certification Course",
      issuer: "Codecademy",
      date: "Oct 2024",
      certNumber: "670F98C492",
      skills: ["SQL"],
      logo: codecademyLogo,
      certificateImage: sqlCertificate,
    },
    {
      name: "Python Certification Course",
      issuer: "Kaggle",
      date: "Mar 2024",
      certNumber: null,
      skills: ["Python"],
      logo: kaggleLogo,
      certificateImage: pythonCertificate,
    },
    {
      name: "Java Certification Course",
      issuer: "Programming Hub",
      date: "Oct 2022",
      certNumber: "1666431909622",
      skills: ["Java"],
      logo: programminghubLogo,
      certificateImage: javaCertificate,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen relative overflow-hidden py-40 bg-[#04081A]">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04081A] via-transparent to-[#04081A]" />
        <div className="absolute inset-0 border border-white/[0.05] grid grid-cols-2 md:grid-cols-4" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Educational Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how academic excellence shapes innovative thinking and
            professional growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative border rounded-xl p-8 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm ${
                hoveredIndex === index
                  ? "border-teal-500 scale-[1.02]"
                  : "border-blue-400/20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{edu.mascot}</span>
                    <h3 className="text-2xl font-bold text-white">
                      {edu.degree}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-500" />
                    {edu.school}
                  </p>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {edu.year}
                  </p>
                </div>

                <p className="text-gray-300 text-sm italic border-l-2 border-teal-500 pl-3">
                  {edu.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm"
                      >
                        <Award className="w-4 h-4" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Scholarships Section */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Scholarships
                  </h4>
                  <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg p-4 mt-2">
                    <div className="font-semibold text-amber-300">Benin Fellows Scholarship, UJA Federation of New York</div>
                    <ul className="list-disc list-inside text-amber-200 text-sm mt-1">
                      <li>Awarded based on high capabilities and potential for academic excellence.</li>
                      <li>Includes participation in the Benin Fellows STEM Program and comprehensive enrichment workshops.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6 mt-5">
            Certifications
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Professional certifications that demonstrate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative border rounded-xl p-8 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm ${
                hoveredIndex === index
                  ? "border-teal-500 scale-[1.02]"
                  : "border-blue-400/20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  {cert.logo && (
                    <img src={cert.logo} alt={cert.issuer} className="w-12 h-12 object-contain rounded-full border border-gray-700 bg-white p-1" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Issued: {cert.date}
                </p>
                {cert.certNumber && (
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <Star className="w-4 h-4 text-teal-400" />
                    Credential ID: {cert.certNumber}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded bg-teal-500/10 text-teal-300 border border-teal-400/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {cert.certificateImage && (
                  <div className="mt-4">
                    <img src={cert.certificateImage} alt={cert.name + ' certificate'} className="w-full max-w-xs rounded shadow-lg mx-auto border border-gray-700" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
