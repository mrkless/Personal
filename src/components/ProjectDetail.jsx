import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ChevronLeft, ChevronRight } from "lucide-react";

// Full descriptions keyed by project ID — 100% standalone, never touches Supabase
const PROJECT_DESCRIPTIONS = {
  "1": "Animal Corner is a mobile application designed to simplify pet care management. It allows users to create pet profiles, schedule veterinary and grooming appointments, and track health records in one organized platform, helping pet owners stay on top of their pets\u2019 needs.",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  // Scroll to top when visiting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load project data
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const project = projects.find((p) => String(p.id) === id);

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
  const images = project.images || project.Images?.length > 0 ? project.Images : [project.img || "https://via.placeholder.com/400x800?text=No+Image"];
  // Description is resolved by ID — fully hardcoded, independent of Supabase data
  const description = PROJECT_DESCRIPTIONS[id] || project.description || project.Description || "No description provided.";
  const title = project.title || project.Title || "Untitled Project";
  const techStack = project.TechStack || ["VS Code", "Dart", "Firebase", "Flutter"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden px-5 sm:px-10 pt-8 pb-10 flex flex-col">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-10 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto w-full mb-2">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm mt-8"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Details */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-6 drop-shadow-sm">
                {title}
              </h1>

              <p className="text-gray-300 text-lg sm:text-lg leading-relaxed whitespace-pre-wrap text-justify">
                {description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white/90">Tech Stack Used</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-200 font-medium shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:bg-purple-500/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.Github || project.GithubLink || "https://github.com/mrkless/CapstoneProject/tree/main/flutter_project/flutter_application_2/lib"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#030014]"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </div>

          {/* Right Column: Image Presentation (Interactive Phone Mockup) */}
          <div className="flex justify-center items-center order-1 lg:order-2 w-full lg:-mt-8">
            <div className="relative group w-full max-w-[320px]">
              {/* Ambient Background Glow matching the current image */}
              <div className="absolute inset-0 bg-purple-500/40 blur-[80px] rounded-full scale-110 group-hover:bg-purple-500/50 transition-colors duration-500" />

              {/* Phone Mockup Frame */}
              <div className="relative bg-[#000000] border-[8px] border-gray-900 rounded-[3rem] w-full aspect-[9/19] shadow-2xl overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.02]">

                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-1/2 mx-auto flex justify-center items-center z-30 shadow-md">
                  <div className="w-16 h-1 bg-gray-700 rounded-full" />
                </div>

                {/* Slider Images */}
                <div className="relative w-full h-full bg-[#111]">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentImage ? 'opacity-100' : 'opacity-0'}`}
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
      `}</style>
    </div>
  );
};

export default ProjectDetails;
