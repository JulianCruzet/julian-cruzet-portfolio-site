"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Github, Linkedin, Mail, Pen, ExternalLink, ChevronLeft, ChevronRight, Folder, ChevronDown } from "lucide-react"

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
      title: "JetLagLess Calculator",
      description:
        "A web application that helps travelers plan their sleep schedules to minimize jet lag when traveling between different time zones. Features a modern, Discord-inspired dark theme UI with a 5-step process for creating personalized jet lag adjustment schedules.",
      image:
        "images/jetlagless.png",
      tech: ["NEXT.JS", "REACT", "UI/UX DESIGN"],
      github: "https://github.com/JulianCruzet/JetLagLess",
      demo: "https://jet-lag-less.vercel.app",
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
      title: "JetLagLess Calculator",
      description:
        "A web application that helps travelers plan their sleep schedules to minimize jet lag when traveling between different time zones. Features a modern, Discord-inspired dark theme UI with a 5-step process for creating personalized jet lag adjustment schedules.",
      tech: ["Next.js", "React", "UI/UX Design"],
      github: "https://github.com/JulianCruzet/JetLagLess",
      demo: "https://jet-lag-less.vercel.app",
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
        "Architecting and building a full stack real-estate platform for a client, consolidating disparate property tools into a cohesive web application with streamlined UX and centralized data management.",
        "Engineering scalable microservices in Go, containerizing components with Docker, and deploying to AWS with CI/CD pipelines for efficient delivery and uptime while also doing QA testing.",
        "Driving the software development life cycle end-to-end, from requirement gathering and wireframing in Figma to implementation, testing and production deployment, all following agile methodologies.",
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
    (index: number) => {
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
      <nav className="fixed w-full bg-[#0a192f] z-50 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <a href="#intro" className="text-lg sm:text-xl font-medium text-white mr-4 sm:mr-12">
            Julian Cruzet
          </a>
          <div className="flex space-x-4 sm:space-x-8 mr-auto">
            <a href="#intro" className="text-sm sm:text-base text-gray-300 hover:text-[#64ffda] transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-sm sm:text-base text-gray-300 hover:text-[#64ffda] transition-colors font-medium">
              About
            </a>
            <a href="#experience" className="text-sm sm:text-base text-gray-300 hover:text-[#64ffda] transition-colors font-medium">
              Experience
            </a>
            <a href="#pet-projects" className="text-sm sm:text-base text-gray-300 hover:text-[#64ffda] transition-colors font-medium">
              Projects
            </a>
          </div>
          <div className="flex space-x-3 sm:space-x-5">
            <a href="mailto:JulianCruzet@gmail.com" className="text-gray-300 hover:text-[#64ffda] transition-colors">
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/JulianCruzet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/JulianCruzet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://JulianCruzet.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#64ffda] transition-colors"
            >
              <Pen size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section id="intro" className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <div className="max-w-3xl mx-auto">
          {/* Abstract Animation - Memoized */}
          <div className="mb-2 w-60 h-60 sm:w-80 sm:h-80 mx-auto">
            <MemoizedAbstractAnimation />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold mb-2 tracking-tight">
            <MemoizedTypewriter />
          </h1>
          <h2 className="text-2xl sm:text-4xl text-gray-400 mb-6 sm:mb-8 font-medium tracking-tight">I create stuff sometimes.</h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-normal">
            I'm a computer science student at Ontario Tech University with a focus on Machine Learning and Software
            Engineering. I'm passionate about building innovative solutions and have experience in full-stack
            development, AI automation, and data analysis.
          </p>
          <a
            href="mailto:JulianCruzet@gmail.com"
            className="inline-flex items-center border border-[#64ffda] text-[#64ffda] px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#64ffda]/10 transition-colors font-medium"
          >
            <Mail className="mr-2" size={18} />
            Say hi!
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-[#64ffda] hover:text-white transition-colors">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 flex items-center tracking-tight">
            <span className="text-[#64ffda] mr-2">/</span> about me
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-[3fr_2fr] gap-8 sm:gap-12 items-start">
            <div className="text-gray-400">
              <p className="mb-3 font-normal text-base sm:text-lg">
                I am currently a <span className="text-white font-medium">Computer Science student</span> at{" "}
                <span className="text-[#64ffda] font-medium">Ontario Tech University</span>, with concentrations in Machine Learning
                and Software Engineering. I'm also working as an{" "}
                <span className="text-white font-medium">AI Automation Engineer Intern</span> at{" "}
                <span className="text-[#64ffda] font-medium">NuNet</span> where I develop full-stack automation solutions.
              </p>

              <p className="mb-3 sm:mb-4 font-medium text-base sm:text-lg">Here are some technologies I have been working with:</p>

              <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-6">
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Python
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Next.js
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> JavaScript
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Springboot
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> GoLang
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Docker
                </div>
              </div>

              <p className="font-normal text-base sm:text-lg">
                Outside of work and studies, I'm involved with Google Developer Groups on campus as a Marketing Lead,
                where I create engaging content to increase campus presence and event turnout. I also enjoy playing
                basketball, fashion, and working out in my free time.
              </p>
            </div>

            <div className="relative group max-w-[320px] sm:max-w-[400px] self-start mx-auto md:mx-0">
              <div className="relative z-10 rounded-lg overflow-hidden aspect-square">
                <img
                  src="images/tester1.jpg"
                  alt="Julian Cruzet"
                  className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 border-2 border-[#64ffda] rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 flex items-center tracking-tight">
            <span className="text-[#64ffda] mr-2">/</span> experience
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="grid md:grid-cols-[200px_1fr] gap-4 sm:gap-8">
            <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => handleExperienceChange(index)}
                  className={`text-left whitespace-nowrap md:whitespace-normal w-full py-2 px-4 border-b-2 md:border-b-0 md:border-r-2 transition-colors ${
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
              <div className="pl-0 md:pl-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {experiences[activeExperience].title.includes("@") ? (
                    <>
                      {experiences[activeExperience].title.split("@")[0]} @{" "}
                      <span className="text-[#64ffda]">{experiences[activeExperience].title.split("@")[1]}</span>
                    </>
                  ) : (
                    experiences[activeExperience].title
                  )}
                </h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">{experiences[activeExperience].period}</p>

                {/* Fixed height container for experience content */}
                <div className="min-h-[200px] sm:min-h-[250px]">
                  <div key={`exp-content-${experienceKey}`} className="animate-slide-in">
                    <ul className="space-y-3 sm:space-y-4">
                      {experiences[activeExperience].achievements.map((achievement, i) => (
                        <li key={i} className="flex text-sm sm:text-base">
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

      {/* Projects Section */}
      <section id="pet-projects" className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 flex items-center tracking-tight">
            <span className="text-[#64ffda] mr-2">/</span> projects
            <div className="h-[1px] bg-gray-700 flex-grow ml-4"></div>
          </h2>

          <div className="relative rounded-lg overflow-hidden bg-gray-800/50 mb-8 sm:mb-12 h-[400px] sm:h-[600px]" ref={carouselRef}>
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

                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 text-center">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">{project.title}</h3>
                    <div className="max-w-xl mx-auto">
                      <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-6">{project.description}</p>
                      <div className="text-[#64ffda] mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-4 justify-center text-sm sm:text-base">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex}>{tech}</span>
                        ))}
                      </div>
                      <div className="flex space-x-4 justify-center">
                        <a href={project.github} className="text-gray-300 hover:text-[#64ffda]">
                          <Github size={20} />
                        </a>
                        <a href={project.demo} className="text-gray-300 hover:text-[#64ffda]">
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-2 sm:p-3 rounded-full hover:bg-[#0a192f] transition-colors z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-[#64ffda]" size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-2 sm:p-3 rounded-full hover:bg-[#0a192f] transition-colors z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="text-[#64ffda]" size={20} />
              </button>
            </div>
          </div>

          {/* Add more space between carousel and indicators */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8 mb-12 sm:mb-16">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrevSlideIndex(currentSlide)
                  setSlideDirection(index > currentSlide ? "left" : "right")
                  setCurrentSlide(index)
                }}
                className={`w-4 sm:w-6 h-1 sm:h-1.5 rounded-sm transition-colors ${
                  currentSlide === index ? "bg-[#64ffda]" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {githubProjects.map((project, index) => (
              <div
                key={index}
                className="bg-[#112240] rounded-lg p-6 sm:p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <Folder className="text-[#64ffda]" size={32} />
                  <div className="flex space-x-3 sm:space-x-4">
                    {project.github && (
                      <a href={project.github} className="text-gray-400 hover:text-[#64ffda]">
                        <Github size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className="text-gray-400 hover:text-[#64ffda]">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
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

// Flowing wave animation with organic movement
function AbstractAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    const render = () => {
      time += 0.01
      ctx.fillStyle = "#0a192f"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw multiple flowing curves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        
        // Create wave-like paths
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const radius = 40 + Math.sin(angle * 3 + time + i) * 15
          const xOffset = Math.sin(time * 0.5 + i) * 10
          const yOffset = Math.cos(time * 0.5 + i) * 10
          
          const x = centerX + Math.cos(angle) * radius + xOffset
          const y = centerY + Math.sin(angle) * radius + yOffset

          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.quadraticCurveTo(
              centerX + Math.cos(angle - 0.05) * (radius + 5) + xOffset,
              centerY + Math.sin(angle - 0.05) * (radius + 5) + yOffset,
              x, y
            )
          }
        }

        ctx.closePath()
        ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 - i * 0.05})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Add floating particles
      const particleCount = 8
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time
        const floatRadius = 30 + Math.sin(time * 2 + i) * 20
        const x = centerX + Math.cos(angle) * floatRadius
        const y = centerY + Math.sin(angle) * floatRadius

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fill()
      }

      // Add center glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30)
      gradient.addColorStop(0, "rgba(100, 255, 218, 0.2)")
      gradient.addColorStop(1, "rgba(100, 255, 218, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
}

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
        // Adjust the delay as needed for specific characters
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
      {/* Only render the cursor if displayText is not empty */}
      {displayText && (
        <span
          className={`absolute -right-[20px] ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
        >
          |
        </span>
      )}
    </span>
  )
}


export default App
