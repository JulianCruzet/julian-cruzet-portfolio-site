"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Github, Linkedin, Mail, Pen, ExternalLink, ChevronLeft, ChevronRight, Folder } from "lucide-react"

// Memoize components that don't need frequent re-renders
const MemoizedAbstractAnimation = memo(AbstractAnimation)
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
        "images/scottiestreamlit.png",
      tech: ["PYTHON", "SCIKIT-LEARN", "STREAMLIT"],
      github: "https://github.com/JulianCruzet/NBA-Player-Contribution-Model",
      demo: "https://scottiebarnes.streamlit.app",
    },
    {
      title: "Ontario Tech Spots",
      description:
        "A full-stack web application using Next.js, React, and Node.js to visualize real-time room availability across the Ontario Tech campus, featuring an interactive 3D map.",
      image:
        "images/otuspots.png",
      tech: ["NEXT.JS", "REACT", "NODE.JS", "PUPPETEER"],
      github: "https://github.com/JMcKesey/ontariotech-spots",
      demo: "https://github.com/JMcKesey/ontariotech-spots",
    },
    {
      title: "JAM Photo Editor",
      description:
        "An interactive photo editing app using Next.js and React, featuring real-time image processing effects, such as layering, greyscale and nearest-neighbor interpolation.",
      image:
        "images/jamphoto.png",
      tech: ["NEXT.JS", "REACT", "IMAGE PROCESSING"],
      github: "https://github.com/JulianCruzet/CompPhotoAssignment1",
      demo: "https://github.com/JulianCruzet/CompPhotoAssignment1",
    },
    {
      title: "Academic Oasis Platform",
      description:
        "A responsive React-based campus engagement platform, featuring dynamic club and job listings, with intuitive filtering and interactive user interest tracking.",
      image:
        "images/academicoasistemplate.png",
      tech: ["REACT", "NODE.JS", "AGILE"],
      github: "#",
      demo: "#",
    },
    {
      title: "SpeedTyper",
      description:
      "A multiplayer typing speed test game that allows users to test out their typing speed and improve their typing skills.",
      image:
        "images/monkeytype.png",
      tech: ["WEBSOCKETS", "JAVASCRIPT", "HTML/CSS"],
      github: "https://github.com/JulianCruzet/MonkeyType-Clone",
      demo: "https://github.com/JulianCruzet/MonkeyType-Clone",
    },
    {
      title: "Spooterfy",
      description:
      "Led Flask-based music recommendation web application, integrating user interaction features and sophisticated recommendation algorithms.",
      image:
        "images/spooterfy1.png",
      tech: ["Python", "React", "Next.js"],
      github: "https://github.com/JulianCruzet/Spotify-Song-Recommender",
      demo: "https://github.com/JulianCruzet/Spotify-Song-Recommender",
    },
  ]

  const githubProjects = [
    {
      title: "NBA Player Contribution Model",
      description:
        "A scikit-learn model and dashboard to evaluate NBA player's impact on game outcomes, with 85% success accuracy using feature importance analysis.",
      tech: ["Python", "scikit-learn", "Streamlit", "Data Analysis"],
      github: "https://github.com/JulianCruzet/NBA-Player-Contribution-Model",
      demo: "https://scottiebarnes.streamlit.app",
    },
    {
      title: "Ontario Tech Spots",
      description:
        "A full-stack application visualizing real-time room availability across campus with an interactive 3D map and automated web scraping system.",
      tech: ["Next.js", "React", "Node.js", "Puppeteer"],
      github: "https://github.com/JMcKesey/ontariotech-spots",
      demo: "https://github.com/JMcKesey/ontariotech-spots",
    },
    {
      title: "JAM Photo Editor",
      description:
        "An interactive photo editing app featuring real-time image processing effects, layering, greyscale and nearest-neighbor interpolation.",
      tech: ["Next.js", "React", "Image Processing"],
      github: "https://github.com/JulianCruzet/CompPhotoAssignment1",
      demo: "https://github.com/JulianCruzet/CompPhotoAssignment1",
    },
    {
      title: "Academic Oasis Platform",
      description:
        "A campus engagement platform with dynamic club and job listings, intuitive filtering and interactive user interest tracking.",
      tech: ["React", "Node.js", "Responsive Design"],
      github: "#",
    },
    {
      title: "Spooterfy",
      description:
        "Led Flask-based music recommendation web application, integrating user interaction features and sophisticated recommendation algorithms.",
      tech: ["Python", "React", "Next.js"],
      github: "https://github.com/JulianCruzet/Spotify-Song-Recommender",
      demo: "https://github.com/JulianCruzet/Spotify-Song-Recommender",
    },
    {
      title: "SpeedTyper",
      description:
        "A multiplayer typing speed test game that allows users to test out their typing speed and improve their typing skills. User friendly and easy to use.",
      tech: ["Websockets", "Javascript", "HTML/CSS"],
      github: "https://github.com/JulianCruzet/MonkeyType-Clone",
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
    {
      company: "VALUE VILLAGE",
      title: "Community Donation Center Ambassador",
      period: "JULY 2021 - CURRENT",
      achievements: [
        "Received, sorted, and processed over 7,000lbs of donations daily, including clothing, accessories, household goods, furniture, books, and more.",
        "Provided exceptional customer service by assisting donors with unloading and handling donations, answering inquiries, and expressing gratitude for their contributions, which raised sales by over 14% since my start date.",
      ],
    }
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
          {/* Abstract Animation - Memoized */}
          <div className="mb-8 w-40 h-40 mx-auto">
            <MemoizedAbstractAnimation />
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
                where I create engaging content to increase campus presence and event turnout. I also enjoy playing
                basketball, fashion, and working out in my free time. I'm always happy to make new friends, so feel
                free to reach out to me!
              </p>
            </div>

            <div className="relative group max-w-[375px] self-start mx-auto md:mx-0">
              <div className="relative z-10 rounded-lg overflow-hidden aspect-square">
                <img
                  src="images/tester1.jpg"
                  alt="Julian Cruzet"
                  className="rounded-xl grayscale hover:grayscale-0 transition-all duration-300 w-full h-full object-cover"
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

                {/* Fixed height container for experience content */}
                <div className="min-h-[250px]">
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
        </div>
      </section>

      {/* Pet Projects Section */}
      <section id="pet-projects" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center">
            <span className="text-[#64ffda] mr-2">/</span> projects
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="relative rounded-xl overflow-hidden bg-gray-800/50 mb-12 h-[600px]" ref={carouselRef}>
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
                    src={project.image}
                    alt={project.title}
                    className="absolute rounded-xl inset-0 w-full h-full object-cover opacity-20"
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

// Fun abstract animation with just the greenish color and white
function AbstractAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    // Particle system
    const particles = []
    const particleCount = 50

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Animation loop
    const render = () => {
      time += 0.01
      ctx.fillStyle = "#0a192f"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw a cool pattern with the greenish color
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw flowing waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()

        const radius = 30 + i * 10
        const waveAmplitude = 15 * Math.sin(time * 0.5)

        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const xOffset = Math.cos(angle * 3 + time) * waveAmplitude
          const yOffset = Math.sin(angle * 2 + time * 1.3) * waveAmplitude

          const x = centerX + Math.cos(angle) * (radius + xOffset)
          const y = centerY + Math.sin(angle) * (radius + yOffset)

          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 - i * 0.03})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw connecting lines
      ctx.globalAlpha = 0.2
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 50) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 50)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 255, 218, ${particle.opacity * (0.5 + Math.sin(time * 2) * 0.5)})`
        ctx.fill()
      })

      // Draw pulsing center
      const pulseSize = 20 + Math.sin(time * 3) * 10
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.5, "rgba(100, 255, 218, 0.4)")
      gradient.addColorStop(1, "rgba(100, 255, 218, 0)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw random sparkles
      for (let i = 0; i < 3; i++) {
        const sparkleX = centerX + Math.cos(time * 3 + (i * Math.PI * 2) / 3) * (40 + Math.sin(time * 2) * 10)
        const sparkleY = centerY + Math.sin(time * 3 + (i * Math.PI * 2) / 3) * (40 + Math.sin(time * 2) * 10)
        const sparkleSize = 2 + Math.sin(time * 5 + i) * 1

        ctx.beginPath()
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
}

// Optimized Typewriter Component
function SequentialTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const fullText = "hi, julian here. "
    let currentIndex = 0
    let timer: string | number | NodeJS.Timeout | undefined

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
    <span className="relative inline-block">
      <span dangerouslySetInnerHTML={{ __html: coloredText }} />
      <span
        className={`absolute -right-[20px] ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
      >
        |
      </span>
    </span>
  )
}

export default App
