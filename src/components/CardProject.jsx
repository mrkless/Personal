import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";

const CardProject = ({ Img, Title, Description, id, GithubLink, TechStack }) => {
  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available.");
    }
  };

  const stack = TechStack && TechStack.length > 0 ? TechStack : ["Dart", "Firebase", "Flutter"];

  return (
    <div className="group relative w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#12071f] via-[#1a092b] to-[#0a0015] border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-500 ease-out hover:-translate-y-2 backdrop-blur-md">
      
      {/* Image Section */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden">
        <img
          src={Img}
          alt={Title || "Project Image"}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d001a]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info Section */}
      <div className="relative p-4 sm:p-5 z-10 flex flex-col justify-between min-h-[180px]">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent tracking-wide line-clamp-1">
            {Title || "Untitled Project"}
          </h3>
          <p className="text-gray-300/80 text-sm mt-2 leading-relaxed line-clamp-3">
            {Description || "No description provided."}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-3">
            {stack.map((tech, index) => (
              <span 
                key={index}
                className="px-2.5 py-1 text-[10px] font-medium text-purple-200 bg-purple-500/10 border border-purple-500/20 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.05)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <a
            href={GithubLink || "https://github.com/mrkless/CapstoneProject/tree/main/flutter_project/flutter_application_2/lib"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>

          {id && (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <span>More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Glow Border Animation */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-400/40 transition-colors duration-500"></div>
    </div>
  );
};

export default CardProject;
