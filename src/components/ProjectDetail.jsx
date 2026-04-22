import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { supabase } from "../supabase";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top when visiting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load project data directly from Supabase
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
        // Fallback to localStorage if Supabase fails (e.g., offline)
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const localProject = projects.find((p) => String(p.id) === id);
        setProject(localProject || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white/70 text-2xl animate-pulse">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white/70 flex flex-col items-center gap-9">
          <span className="text-2xl">Project not found.</span>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Go Back</button>
        </div>
      </div>
    );
  }

  // Handle various data structures
  const images = project.images || project.Images?.length > 0 ? project.Images : [project.img || "https://placeholder.com/400x800?text=No+Image"];
  // Description is resolved from Supabase data
  const description = project.full_description || project.description || project.Description || "No description provided.";
  const title = project.title || project.Title || "Untitled Project";
  const techStack = project.TechStack || project.techStack || project.tech_stack || ["React", "Tailwind", "Vite"];
  const githubLink = project.Github || project.GithubLink || project.link || "https://github.com/mrkless/CapstoneProject/tree/main#";
  const isWebsite = project.type === 'website' || project.is_website || project.isWebsite || String(id) === "2" || title.toLowerCase().includes("campus");
  const demoLink = project.demo || project.live;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-[100dvh] bg-[#030014] text-white relative overflow-x-hidden lg:overflow-hidden px-6 lg:px-10 py-20 lg:py-0 flex flex-col justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-10 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Navigation - Keep it absolute to save vertical space */}
      <div className="absolute top-6 left-6 md:left-10 z-50">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center space-x-2 px-4 py-2 md:px-5 md:py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm md:text-base">Back</span>
        </button>
      </div>

      <div className="w-full flex items-center justify-center lg:h-full mt-24 lg:mt-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* Left Column: Details */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 w-full max-w-2xl mx-auto">
            <div className="space-y-4 md:space-y-6 md:pl-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-sm line-clamp-2">
                {title}
              </h1>

              <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-wrap text-justify max-h-[30vh] md:max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-white/90">Tech Stack Used</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-200 font-medium shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:bg-purple-500/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm md:text-base font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#030014]"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
                View Source Code
              </a>

              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm md:text-base font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#030014]"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Image Presentation (Interactive Mockup) */}
          <div className="flex justify-center items-center order-1 lg:order-2 w-full px-4 md:px-0 mt-8 lg:mt-0">
            <div className={`relative group w-full flex justify-center ${isWebsite ? 'max-w-[500px] lg:max-w-[650px]' : 'max-w-[240px] md:max-w-[280px]'}`}>
              {/* Ambient Background Glow matching the current image */}
              <div className="absolute inset-0 bg-purple-500/40 blur-[60px] rounded-full scale-105 group-hover:bg-purple-500/50 transition-colors duration-500" />

              {/* Device Mockup Frame */}
              <div className={`relative bg-[#000000] border-gray-900 shadow-2xl overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.02] ${isWebsite ? 'border-[6px] md:border-[10px] rounded-2xl w-full aspect-[16/10]' : 'border-[8px] md:border-[10px] rounded-[2.5rem] w-full aspect-[9/19]'}`}>

                {/* Device Camera/Notch */}
                {isWebsite ? (
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full z-30 shadow-inner"></div>
                ) : (
                  <div className="absolute top-0 inset-x-0 h-4 md:h-5 bg-gray-900 rounded-b-2xl w-1/3 mx-auto flex justify-center items-center z-30 shadow-md">
                    <div className="w-10 h-1 bg-gray-700 rounded-full" />
                  </div>
                )}

                {/* Slider Images */}
                <div className="relative w-full h-full bg-[#111]">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover ${isWebsite ? 'object-top' : 'object-center'} transition-opacity duration-700 ease-in-out ${idx === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                </div>

                {/* Slider Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-30"
                    >
                      <ChevronLeft className="w-6 h-6 mr-1" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-30"
                    >
                      <ChevronRight className="w-6 h-6 ml-1" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-30">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-purple-500 w-6 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Screen Reflection Overlay to make it feel like real glass */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
