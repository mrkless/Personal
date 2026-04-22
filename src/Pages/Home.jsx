import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group flex items-center mb-4">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-sm text-gray-300">Available for Work</span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Fullstack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-5 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, target, rel }) => (
  <a href={href} target={target} rel={rel} className="inline-block w-full sm:w-auto">
    <button className="group relative w-full sm:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 px-6 sm:px-0 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${text === "Contact"
              ? "group-hover:translate-x-1"
              : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["IT Graduate", "Frontend Enthusiast", "Backend Developer", "Problem Solver"];
const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/mrkless" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/lester-bucag-29287737a" },
  { icon: Instagram, link: "https://www.instagram.com/mrk.less/" },
];

const CodeSnippet = memo(() => {
  const [code, setCode] = useState("");
  const fullCode = `const developer = {\n  name: 'Lester',\n  role: 'Full Stack Dev',\n  passion: ['Coding', 'Building'],\n  status: 'Ready to Build',\n  innovate: () => {\n    return 'Amazing Apps';\n  }\n};`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCode.length) {
        setCode(fullCode.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Faster typing speed

    return () => clearInterval(typingInterval);
  }, []);

  const highlightedCode = (() => {
    return code
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\b(const|return)\b/g, '<span class="text-[#c678dd]">$1</span>')
      .replace(/('.*?')/g, '<span class="text-[#98c379]">$1</span>')
      .replace(/([a-zA-Z0-9_]+)(?=:)/g, '<span class="text-[#e06c75]">$1</span>')
      .replace(/\b(developer|innovate)\b/g, '<span class="text-[#61afef]">$1</span>');
  })();

  return (
    <div className="relative group w-full max-w-[420px] mx-auto z-10 animate-float">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-1000"></div>
      <div className="relative bg-[#030014]/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-opacity-80 transition-opacity cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-opacity-80 transition-opacity cursor-pointer"></div>
          </div>
          <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
            developer.js
          </div>
        </div>
        <div className="p-6 text-sm text-left font-mono overflow-auto whitespace-pre leading-relaxed tracking-wide text-gray-300 h-[260px] sm:h-[280px]">
          <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
});

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10 });
    };
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] relative" id="Home">
      {/* Background Subtle Grid Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#6366f1] opacity-20 blur-[100px]"></div>
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen flex items-center justify-center pt-20 pb-20 lg:pt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8 text-left lg:text-left order-1 w-full relative z-10" data-aos="fade-right" data-aos-delay="200">
              <StatusBadge />
              <MainTitle />

              {/* Typing Effect Subheading */}
              <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent font-medium tracking-wide">
                  {text}
                </span>
                <span className="w-[3px] h-6 lg:h-8 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-2 animate-blink"></span>
              </div>

              {/* Short Intro Paragraph */}
              <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                Hi, I’m Mark Lester Bucag, a passionate IT graduate stepping into the world of full-stack development.
                I specialize in crafting minimal, performant, and deeply interactive web experiences with modern tech.
                Always learning, ever evolving.
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                {TECH_STACK.map((tech, index) => (
                  <TechStack key={index} tech={tech} />
                ))}
              </div>

              {/* Buttons and Social Links Group */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center mt-8" data-aos="fade-up" data-aos-delay="1400">
                <div className="flex flex-wrap gap-4">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                  <CTAButton href="/MarkLester_Bucag_Resume.pdf" text="Resume" icon={ExternalLink} target="_blank" rel="noopener noreferrer" />
                </div>
                <div className="flex gap-4 mt-2 sm:mt-0 hidden sm:flex">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Code Snippet */}
            <div
              className="w-full relative flex items-center justify-center order-2 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-lg lg:ml-auto">
                {/* Background Glow */}
                <div className={`absolute -inset-8 md:-inset-12 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-3xl transition-all duration-700 ease-in-out ${isHovering ? "opacity-70 scale-110" : "opacity-40 scale-100"}`}></div>

                <div className={`relative z-10 w-full transform transition-all duration-700 ease-out ${isHovering ? "scale-[1.03] -translate-y-2" : "scale-100 translate-y-0"}`}>
                  <div className={`transition-all duration-700 ${isHovering ? "rotate-1" : "-rotate-1"} mx-auto`}>
                    <CodeSnippet />
                  </div>
                </div>

                {/* Subtlest background glow */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${isHovering ? "opacity-80" : "opacity-30"}`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${isHovering ? "scale-125" : "scale-100"}`}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
