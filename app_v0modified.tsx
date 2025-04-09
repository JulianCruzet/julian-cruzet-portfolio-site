"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Github, Linkedin, Mail, Pen, ExternalLink, ChevronLeft, ChevronRight, Folder } from "lucide-react"

// Memoize components that don't need frequent re-renders
const MemoizedFractalAnimation = memo(FractalAnimation)
const MemoizedTypewriter = memo(SequentialTypewriter)

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState(0)
  const [activeExperience, setActiveExperience] = useState(0)
  const [experienceKey, setExperienceKey] = useState(0)
  const [slideDirection, setSlideDirection] = useState("left")
  const carouselRef = useRef(null)

  // Reduce data size by removing unnecessary fields when not needed
  const featuredProjects = [
    {
      title: "NBA Player Contribution Model",
      description:
        "A scikit-learn model and dashboard using Streamlit to evaluate and research any NBA player's impact on game outcomes, with an 85% success accuracy.",
      image:
        "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tech: ["PYTHON", "SCIKIT-LEARN", "STREAMLIT"],
      github: "#",
      demo: "#",
    },
    {
      title: "Ontario Tech Spots",
      description:
        "A full-stack web application using Next.js, React, and Node.js to visualize real-time room availability across the Ontario Tech campus, featuring an interactive 3D map.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tech: ["NEXT.JS", "REACT", "NODE.JS", "PUPPETEER"],
      github: "#",
      demo: "#",
    },
    {
      title: "JAM Photo Editor",
      description:
        "An interactive photo editing app using Next.js and React, featuring real-time image processing effects, such as layering, greyscale and nearest-neighbor interpolation.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tech: ["NEXT.JS", "REACT", "IMAGE PROCESSING"],
      github: "#",
      demo: "#",
    },
    {
      title: "Academic Oasis Platform",
      description:
        "A responsive React-based campus engagement platform, featuring dynamic club and job listings, with intuitive filtering and interactive user interest tracking.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      tech: ["REACT", "NODE.JS", "AGILE"],
      github: "#",
      demo: "#",
    },
  ]

  const githubProjects = [
    {
      title: "NBA Player Contribution Model",
      description:
        "A scikit-learn model and dashboard to evaluate NBA player's impact on game outcomes, with 85% success accuracy using feature importance analysis.",
      tech: ["Python", "scikit-learn", "Streamlit", "Data Analysis"],
      github: "#",
      demo: "#",
    },
    {
      title: "Ontario Tech Spots",
      description:
        "A full-stack application visualizing real-time room availability across campus with an interactive 3D map and automated web scraping system.",
      tech: ["Next.js", "React", "Node.js", "Puppeteer"],
      github: "#",
      demo: "#",
    },
    {
      title: "JAM Photo Editor",
      description:
        "An interactive photo editing app featuring real-time image processing effects, layering, greyscale and nearest-neighbor interpolation.",
      tech: ["Next.js", "React", "Image Processing"],
      github: "#",
      demo: "#",
    },
    {
      title: "Academic Oasis Platform",
      description:
        "A campus engagement platform with dynamic club and job listings, intuitive filtering and interactive user interest tracking.",
      tech: ["React", "Node.js", "Responsive Design"],
      github: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive personal portfolio website showcasing projects, skills, and experience with a modern, interactive design.",
      tech: ["React", "Tailwind CSS", "Next.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "GDG Campus Content",
      description:
        "Social media content creation for Google Developer Groups, increasing campus presence and event turnout.",
      tech: ["Video Editing", "Social Media", "Marketing"],
      github: "#",
    },
  ]

  const experiences = [
    {
      company: "NUNET",
      title: "AI Automation Engineer Intern @ NuNet",
      period: "APR 2025 - CURRENT",
      achievements: [
        "Engineering full-stack automation solutions using Python, designing and implementing both front-end interfaces and back-end logic to improve workflow efficiency.",
        "Integrating AI-driven systems to identify and automate repetitive tasks, enhancing accuracy and reducing manual operations across internal and client use cases.",
        "Collaborating in a 4-person agile team, contributing to system architecture decisions, creating mockups in Figma, and delivering scalable features in production environments.",
      ],
    },
    {
      company: "ACADEMIC OASIS",
      title: "Software Developer",
      period: "JAN 2024 - MAR 2025",
      achievements: [
        "Developed a responsive React-based campus engagement platform, featuring dynamic club and job listings, with intuitive filtering and interactive user interest tracking, enhancing student involvement in university activities and career opportunities.",
        "Worked in agile software development, with weekly scrum meetings, focusing on adapting the platform accordingly based on the business model, and consumer feedback.",
      ],
    },
    {
      company: "GOOGLE DEVELOPER GROUPS",
      title: "Marketing Lead",
      period: "SEP 2024 - CURRENT",
      achievements: [
        "Lead and directed a small team to film, edit and post engaging and influential social media content.",
        "Increased campus presence, general member count, and event turnout through strategic marketing initiatives.",
      ],
    },
  ]

  // Use useCallback to memoize functions
  const handleExperienceChange = useCallback(
    (index) => {
      if (index === activeExperience) return
      setActiveExperience(index)
      setExperienceKey((prev) => prev + 1)
    },
    [activeExperience],
  )

  // Optimize carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlideIndex(currentSlide)
      setSlideDirection("left")
      setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, featuredProjects.length])

  // Memoize slide navigation functions
  const nextSlide = useCallback(() => {
    setPrevSlideIndex(currentSlide)
    setSlideDirection("left")
    setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
  }, [currentSlide, featuredProjects.length])

  const prevSlide = useCallback(() => {
    setPrevSlideIndex(currentSlide)
    setSlideDirection("right")
    setCurrentSlide((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1))
  }, [currentSlide, featuredProjects.length])

  return (
    <div className="bg-[#0a192f] text-gray-300 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0a192f] z-50 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <a href="#intro" className="text-xl font-medium text-white mr-12">
            Julian Cruzet
          </a>
          <div className="flex space-x-8 mr-auto">
            <a href="#intro" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              About
            </a>
            <a href="#experience" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              Experience
            </a>
            <a href="#pet-projects" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              Projects
            </a>
          </div>
          <div className="flex space-x-5">
            <a href="mailto:JulianCruzet@gmail.com" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/JulianCruzet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/JulianCruzet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://JulianCruzet.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Pen size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section id="intro" className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Animated Fractal Tree - Memoized */}
          <div className="mb-8 w-40 h-40 mx-auto">
            <MemoizedFractalAnimation />
          </div>

          <h1 className="text-6xl font-bold mb-2">
            <MemoizedTypewriter />
          </h1>
          <h2 className="text-4xl text-gray-400 mb-8">I create stuff sometimes.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm a computer science student at Ontario Tech University with a focus on Machine Learning and Software
            Engineering. I'm passionate about building innovative solutions and have experience in full-stack
            development, AI automation, and data analysis.
          </p>
          <a
            href="mailto:JulianCruzet@gmail.com"
            className="inline-flex items-center border border-[#64ffda] text-[#64ffda] px-6 py-3 rounded hover:bg-[#64ffda]/10 transition-colors"
          >
            <Mail className="mr-2" size={18} />
            Say hi!
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#64ffda] mr-2">/</span> about me
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
            <div className="text-gray-400">
              <p className="mb-4">
                I am currently a <span className="text-white">Computer Science student</span> at{" "}
                <span className="text-[#64ffda]">Ontario Tech University</span>, with concentrations in Machine Learning
                and Software Engineering. I'm also working as an{" "}
                <span className="text-white">AI Automation Engineer Intern</span> at{" "}
                <span className="text-[#64ffda]">NuNet</span> where I develop full-stack automation solutions.
              </p>

              <p className="mb-6">Here are some technologies I have been working with:</p>

              <div className="grid grid-cols-2 gap-2 mb-8">
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Python
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> JavaScript
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> React.js
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Next.js
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Node.js
                </div>
                <div className="flex items-center">
                  <span className="text-[#64ffda] mr-2">▹</span> Java
                </div>
              </div>

              <p>
                Outside of work and studies, I'm involved with Google Developer Groups on campus as a Marketing Lead,
                where I create engaging content to increase campus presence and event turnout.
              </p>
            </div>

            <div className="relative group max-w-[350px] self-start mx-auto md:mx-0">
              <div className="relative z-10 rounded-lg overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Julian Cruzet"
                  className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 border-2 border-[#64ffda] rounded-lg transform translate-x-5 translate-y-5 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#64ffda] mr-2">/</span> experience
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-[200px_1fr] gap-8">
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => handleExperienceChange(index)}
                  className={`text-left w-full py-2 px-4 border-r-2 transition-colors ${
                    activeExperience === index
                      ? "border-[#64ffda] text-[#64ffda]"
                      : "border-gray-700 text-gray-400 hover:text-[#64ffda] hover:border-[#64ffda]"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden">
              <div className="pl-8">
                <h3 className="text-xl font-bold text-white mb-1">
                  {experiences[activeExperience].title.includes("@") ? (
                    <>
                      {experiences[activeExperience].title.split("@")[0]} @{" "}
                      <span className="text-[#64ffda]">{experiences[activeExperience].title.split("@")[1]}</span>
                    </>
                  ) : (
                    experiences[activeExperience].title
                  )}
                </h3>
                <p className="text-gray-400 mb-4">{experiences[activeExperience].period}</p>

                {/* Use CSS transition for smoother animation */}
                <div key={`exp-content-${experienceKey}`} className="animate-slide-in">
                  <ul className="space-y-4">
                    {experiences[activeExperience].achievements.map((achievement, i) => (
                      <li key={i} className="flex">
                        <span className="text-[#64ffda] mr-2 mt-1">▹</span>
                        <span className="text-gray-400">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Projects Section */}
      <section id="pet-projects" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#64ffda] mr-2">/</span> projects
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="relative rounded-lg overflow-hidden bg-gray-800/50 mb-12 h-[600px]" ref={carouselRef}>
            <div className="relative h-full overflow-hidden">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
                    index === currentSlide
                      ? "translate-x-0 z-10"
                      : index === prevSlideIndex
                        ? slideDirection === "left"
                          ? "-translate-x-full"
                          : "translate-x-full"
                        : index > currentSlide
                          ? "translate-x-full"
                          : "-translate-x-full"
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-center">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h3>
                    <div className="max-w-xl mx-auto">
                      <p className="text-xl text-gray-300 mb-6">{project.description}</p>
                      <div className="text-[#64ffda] mb-8 flex flex-wrap gap-4 justify-center">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex}>{tech}</span>
                        ))}
                      </div>
                      <div className="flex space-x-4 justify-center">
                        <a href={project.github} className="text-gray-300 hover:text-[#64ffda]">
                          <Github size={24} />
                        </a>
                        <a href={project.demo} className="text-gray-300 hover:text-[#64ffda]">
                          <ExternalLink size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-3 rounded-full hover:bg-[#0a192f] transition-colors z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-[#64ffda]" size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-3 rounded-full hover:bg-[#0a192f] transition-colors z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="text-[#64ffda]" size={24} />
              </button>
            </div>
          </div>

          {/* Add more space between carousel and indicators */}
          <div className="flex justify-center space-x-3 mt-8 mb-16">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrevSlideIndex(currentSlide)
                  setSlideDirection(index > currentSlide ? "left" : "right")
                  setCurrentSlide(index)
                }}
                className={`w-6 h-1.5 rounded-sm transition-colors ${
                  currentSlide === index ? "bg-[#64ffda]" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {githubProjects.map((project, index) => (
              <div
                key={index}
                className="bg-[#112240] rounded-lg p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <Folder className="text-[#64ffda]" size={40} />
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} className="text-gray-400 hover:text-[#64ffda]">
                        <Github size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className="text-gray-400 hover:text-[#64ffda]">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-3 text-gray-500 text-sm">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Simplified Fractal Animation with better performance
function FractalAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let time = 0

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Simplified fractal drawing with fewer calculations
    const drawFractal = (x, y, length, angle, depth) => {
      if (depth === 0) return

      const x2 = x + length * Math.cos(angle)
      const y2 = y + length * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = depth === 6 ? "#64ffda" : `hsl(160, 80%, ${60 + Math.sin(time) * 10}%)`
      ctx.lineWidth = depth * 0.5
      ctx.stroke()

      // Simplified branch angle calculations
      const branchAngle = 0.4 + 0.1 * Math.sin(time * 0.5)

      // Draw branches with less variation for better performance
      drawFractal(x2, y2, length * 0.7, angle - branchAngle, depth - 1)
      drawFractal(x2, y2, length * 0.7, angle + branchAngle, depth - 1)
    }

    const render = () => {
      // Reduce animation speed for better performance
      time += 0.015
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Start the fractal from the bottom center
      drawFractal(
        canvas.width / 2,
        canvas.height * 0.8,
        canvas.height * 0.2,
        -Math.PI / 2 + Math.sin(time * 0.2) * 0.05,
        5, // Reduced depth for better performance
      )

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// Optimized Typewriter Component
function SequentialTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const fullText = "hi, julian here."
    let currentIndex = 0
    let timer

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeNextChar, currentIndex === 4 ? 150 : 80)
      } else {
        setIsComplete(true)
      }
    }

    // Start typing after a short delay
    timer = setTimeout(typeNextChar, 500)

    return () => clearTimeout(timer)
  }, [])

  // Blinking cursor effect - only run when typing is complete
  useEffect(() => {
    if (!isComplete) return

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [isComplete])

  // Pre-process the colored text once instead of on every render
  const coloredText = displayText.replace("julian", '<span class="text-[#64ffda]">julian</span>')

  return (
    <span className="relative">
      <span dangerouslySetInnerHTML={{ __html: coloredText }} />
      <span className={`absolute ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>|</span>
    </span>
  )
}

export default App
