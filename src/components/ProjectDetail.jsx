import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ChevronLeft, ChevronRight, ExternalLink, Download } from "lucide-react";
import { supabase } from "../supabase";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-5">
          <p className="text-white/50 text-xl">Project not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images =
    project.images || (project.Images?.length > 0 ? project.Images : [project.img || "https://placeholder.com/400x800?text=No+Image"]);
  const description = project.full_description || project.description || project.Description || "No description provided.";
  const title = project.title || project.Title || "Untitled Project";
  const techStack = project.TechStack || project.techStack || project.tech_stack || ["React", "Tailwind", "Vite"];
  const githubLink = project.Github || project.GithubLink || project.link || "#";
  const isWebsite =
    project.type === "website" ||
    project.is_website ||
    project.isWebsite ||
    String(id) === "2" ||
    title.toLowerCase().includes("campus");
  const demoLink = project.demo || project.live;
  const apkLink = project.apk;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-700/25 rounded-full filter blur-[130px] animate-blob" />
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-700/20 rounded-full filter blur-[130px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-700/15 rounded-full filter blur-[130px] animate-blob animation-delay-4000" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Back Button ── */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl hover:bg-white/[0.09] hover:border-white/[0.18] transition-all duration-300 backdrop-blur-md text-sm font-medium text-white/65 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="flex items-center justify-center min-h-screen px-5 md:px-10 lg:px-16 py-24 md:py-20 lg:py-10">
        <div className="w-full max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-0 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1 mt-8 md:mt-12 lg:mt-0">

            {/* Eyebrow + Title */}
            <div className="space-y-2.5">
              <span className="text-xs md:text-sm font-semibold tracking-[0.22em] text-purple-400/80 uppercase">
                Project Overview
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
                <span className="bg-gradient-to-br from-white via-white/95 to-white/50 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/70" />
            </div>

            {/* Description */}
            {(() => {
              // Split into tokens: split on newlines AND on inline bullets (•)
              // Handles both: "line1\n• item" and "text • item1 • item2" patterns
              const raw = description || "";

              // Step 1: normalize — split \n into separate entries, then split each on • to extract bullets
              const tokens = [];
              raw.split(/\n/).forEach((line) => {
                const parts = line.split(/•/).map(s => s.trim()).filter(Boolean);
                if (parts.length === 0) {
                  tokens.push({ type: "break" });
                } else if (parts.length === 1 && !line.trim().startsWith("•")) {
                  tokens.push({ type: "text", value: parts[0] });
                } else {
                  // First part may be plain text before the first bullet
                  if (!line.trim().startsWith("•") && parts[0]) {
                    tokens.push({ type: "text", value: parts[0] });
                    parts.slice(1).forEach(p => tokens.push({ type: "bullet", value: p }));
                  } else {
                    parts.forEach(p => tokens.push({ type: "bullet", value: p }));
                  }
                }
              });

              // Step 2: group consecutive bullets into lists
              const blocks = [];
              let i = 0;
              while (i < tokens.length) {
                const t = tokens[i];
                if (t.type === "bullet") {
                  const group = [];
                  while (i < tokens.length && tokens[i].type === "bullet") {
                    group.push(tokens[i].value);
                    i++;
                  }
                  blocks.push({ type: "list", items: group });
                } else if (t.type === "text") {
                  blocks.push({ type: "text", value: t.value });
                  i++;
                } else {
                  i++; // skip breaks between blocks
                }
              }

              return (
                <div className="text-white/70 text-[15px] md:text-base lg:text-[15px] leading-[1.8] max-h-[28vh] md:max-h-[22vh] lg:max-h-[30vh] overflow-y-auto pr-3 custom-scrollbar space-y-2.5">
                  {blocks.map((block, idx) =>
                    block.type === "text" ? (
                      <p key={idx}>{block.value}</p>
                    ) : (
                      <ul key={idx} className="space-y-1.5">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="mt-[0.52em] w-1.5 h-1.5 rounded-full bg-purple-400/80 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              );
            })()}

            {/* Tech Stack — horizontal scroll, single line */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Tech Stack</p>
              <div className="flex gap-2 overflow-x-auto pb-1 tech-scroll">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="flex-shrink-0 px-3.5 py-1.5 text-[13px] md:text-sm font-medium bg-white/[0.05] border border-white/[0.09] rounded-lg text-white/70 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/[0.1] transition-all duration-200 cursor-default whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-0.5">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 lg:px-6 lg:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm md:text-base lg:text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(139,92,246,0.4)] active:scale-[0.98]"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                Source Code
              </a>

              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 lg:px-6 lg:py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white/80 text-sm md:text-base lg:text-sm font-semibold hover:bg-white/[0.09] hover:text-white hover:border-white/[0.22] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                  Live Demo
                </a>
              )}

              {apkLink && (
                <a
                  href={apkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 md:px-7 md:py-3.5 lg:px-6 lg:py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white/80 text-sm md:text-base lg:text-sm font-semibold hover:bg-white/[0.09] hover:text-white hover:border-white/[0.22] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                  Download APK
                </a>
              )}
            </div>
          </div>

          {/* ── Right: Device Mockup ── */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div
              className={`relative group flex justify-center ${isWebsite
                  ? "w-[95vw] max-w-[600px] md:w-[88vw] md:max-w-[760px] lg:w-full lg:max-w-none"
                  : "w-[44vw] max-w-[190px] md:w-[30vw] md:max-w-[240px] lg:w-full lg:max-w-[300px]"
                }`}
            >
              {/* Ambient glow */}
              <div className="absolute inset-[-8%] bg-purple-600/25 blur-[80px] rounded-full group-hover:bg-purple-600/35 transition-colors duration-700" />

              {/* Device frame */}
              <div
                className={`relative z-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] ${isWebsite
                    ? "w-full aspect-[16/10] rounded-2xl border-[10px] border-[#181828] ring-1 ring-white/[0.07]"
                    : "w-full aspect-[9/19] rounded-[2rem] border-[6px] border-[#181828] ring-1 ring-white/[0.07]"
                  }`}
              >
                {/* Notch / pill */}
                {isWebsite ? (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#181828] rounded-full z-30" />
                ) : (
                  <div className="absolute top-0 inset-x-0 flex justify-center z-30">
                    <div className="w-[33%] h-[22px] bg-[#181828] rounded-b-2xl flex items-center justify-center">
                      <div className="w-10 h-[3px] bg-[#2a2a40] rounded-full" />
                    </div>
                  </div>
                )}

                {/* Images */}
                <div className="relative w-full h-full bg-[#0a0a18]">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover ${isWebsite ? "object-top" : "object-center"
                        } transition-opacity duration-500 ease-in-out ${idx === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/55 hover:bg-black/85 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 z-30"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/55 hover:bg-black/85 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 z-30"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-30">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImage
                            ? "bg-purple-400 w-6 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                            : "bg-white/30 w-2 hover:bg-white/60"
                          }`}
                      />
                    ))}
                  </div>
                )}

                {/* Glass sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none z-20" />
              </div>

              {/* Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 text-xs text-white/30 font-medium tracking-widest">
                  {currentImage + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(25px, -40px) scale(1.08); }
          66%  { transform: translate(-15px, 15px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 12s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.35);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }
        .tech-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .tech-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ProjectDetails;