"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, Pen, ExternalLink, ChevronLeft, ChevronRight, Folder, ChevronDown } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { GlareCard } from "@/components/ui/glare-card"
import useEmblaCarousel from "embla-carousel-react"

// Memoize components that don't need frequent re-renders
const MemoizedTypewriter = memo(SequentialTypewriter)

function App() {
  const [activeExperience, setActiveExperience] = useState(0)
  const [experienceKey, setExperienceKey] = useState(0)
  
  // Embla Carousel configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 })
  const [selectedIndex, setSelectedIndex] = useState(0)

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
      company: "ROYAL BANK OF CANADA",
      title: "Software Developer Intern",
      period: "SEP 2025 - DEC 2025",
      achievements: [
        "Developing and enhancing Salesforce components for 6,500+ Wealth Management Advisors using APEX, Lightning Web Components (LWC), and JavaScript to build an Integrated Advisor Desktop (IAD) that optimizes advisor productivity.",
        "Participating in Agile/Scrum development cycles using JIRA for sprint planning and stakeholder demos, contributing to CI/CD pipelines and following Salesforce best practices for code deployment and testing.",
        "Collaborating with cross-functional teams of 15+ developers and business stakeholders to troubleshoot, document, and deliver critical CRM capabilities that reduce swivel chair navigation and improve advisor efficiency",
      ],
    },
    {
      company: "NUNET",
      title: "AI Automation Engineer Intern",
      period: "MAR 2025 - MAY 2025",
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
      period: "SEP 2024 - APR 2025",
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)

    // Autoplay implementation
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 5000)

    return () => {
        clearInterval(autoplay)
        emblaApi.off('reInit', onSelect)
        emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="bg-[#0a192f] text-gray-300 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0a192f]/40 backdrop-blur-md z-50 px-4 sm:px-8 py-4 border-b border-white/5">
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
          <div className="hidden sm:flex space-x-3 sm:space-x-5">
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
      <AuroraBackground id="intro" className="min-h-screen">
        <div className="max-w-3xl mx-auto w-full px-4 text-center relative z-10">
          <div className="space-y-[-0.2em] mb-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              <MemoizedTypewriter />
            </h1>
            <h2 className="text-2xl sm:text-4xl text-gray-200 font-medium tracking-tight leading-[1.1]">I create stuff sometimes.</h2>
          </div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-normal mt-4">
            I'm a computer science student at Ontario Tech University with a focus on Machine Learning and Software
            Engineering. I'm passionate about building real solutions to real problemsand have experience in full-stack
            development, AI automation, and Salesforce.
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <a href="#about" className="text-[#64ffda] hover:text-white transition-colors">
            <ChevronDown size={24} />
          </a>
        </div>
      </AuroraBackground>

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
                and Software Engineering. I just finished up my co-op working as a{" "}
                <span className="text-white font-medium">Software Developer</span> at{" "}
                <span className="text-[#64ffda] font-medium">RBC</span> where I developed Salesforce solutions.
              </p>

              <p className="mb-3 sm:mb-4 font-medium text-base sm:text-lg">Here are some technologies I have been working with:</p>

              <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-6">
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Python
                </div>
                <div className="flex items-center font-medium text-sm sm:text-base">
                  <span className="text-[#64ffda] mr-2">▹</span> Salesforce
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
                Outside of work and studies, I spend my time (and money) on home decor, food, fashion, my mom and my girfriend
              </p>
            </div>

            <div className="relative group max-w-[320px] sm:max-w-[400px] self-start mx-auto md:mx-0">
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-square transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(100,255,218,0.2)]">
                <img
                  src="images/tester1.jpg"
                  alt="Julian Cruzet"
                  className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-300 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 border-2 border-[#64ffda] rounded-2xl -z-10 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
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

          <div className="relative rounded-lg bg-gray-800/50 mb-8 sm:mb-12 h-[400px] sm:h-[600px] overflow-hidden group">
            <div className="h-full" ref={emblaRef}>
              <div className="flex h-full">
                {featuredProjects.map((project, index) => (
                  <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 text-center select-none">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">{project.title}</h3>
                      <div className="max-w-xl mx-auto">
                        <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-6">{project.description}</p>
                        <div className="text-[#64ffda] mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-4 justify-center text-sm sm:text-base">
                          {project.tech.map((tech, techIndex) => (
                            <span key={techIndex}>{tech}</span>
                          ))}
                        </div>
                        <div className="flex space-x-4 justify-center pointer-events-auto">
                          <a href={project.github} className="text-gray-300 hover:text-[#64ffda] z-10" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                          </a>
                          <a href={project.demo} className="text-gray-300 hover:text-[#64ffda] z-10" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-2 sm:p-3 rounded-full hover:bg-[#0a192f] transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-[#64ffda]" size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 p-2 sm:p-3 rounded-full hover:bg-[#0a192f] transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="text-[#64ffda]" size={20} />
            </button>
          </div>

          {/* Add more space between carousel and indicators */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8 mb-12 sm:mb-16">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-4 sm:w-6 h-1 sm:h-1.5 rounded-sm transition-colors ${
                  index === selectedIndex ? "bg-[#64ffda]" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {githubProjects.map((project, index) => (
              <GlareCard
                key={index}
                className="flex flex-col items-start justify-between bg-[#112240] p-6 sm:p-8 h-full"
              >
                <div className="w-full">
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
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>
              </GlareCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
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