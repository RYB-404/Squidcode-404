"use client";

import { useState, useEffect, useCallback } from "react";
import { Archive, FolderOpen, Download, Trash2, Calendar, Tag } from "lucide-react";
import { SquidProject } from "@/lib/types";
import { loadProjects, deleteProject } from "@/lib/storage";
import { exportProjectAsMarkdown } from "@/lib/mock-ai";

interface SavedSectionProps {
  onOpenProject: (project: SquidProject) => void;
  refreshKey: number;
}

export function SavedSection({ onOpenProject, refreshKey }: SavedSectionProps) {
  const [projects, setProjects] = useState<SquidProject[]>([]);

  useEffect(() => {
    setProjects(loadProjects());
  }, [refreshKey]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteProject(id);
      setProjects(loadProjects());
    },
    []
  );

  const handleExport = useCallback((project: SquidProject) => {
    const md = exportProjectAsMarkdown(project);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.selectedIdea.name.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="section-header">
        <div className="section-icon bg-foreground/6 text-foreground border-foreground/12">
          <Archive className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Saved Projects</h2>
          <p className="text-sm text-foreground/50 mt-0.5">{projects.length > 0 ? `${projects.length} project${projects.length !== 1 ? "s" : ""} saved` : "Your saved project workspace."}</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-foreground/4 rounded-2xl p-5 mb-4 border-2 border-foreground/6">
            <Archive className="h-10 w-10 text-foreground/20" />
          </div>
          <h3 className="text-lg font-extrabold text-foreground mb-1">No saved projects yet</h3>
          <p className="text-sm text-foreground/40 max-w-xs leading-relaxed">
            Generate and save a project from the Outputs section to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card-brutal p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold text-foreground leading-snug">{project.selectedIdea.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-foreground/40 flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {project.opportunity.title}
                    </span>
                    <span className="text-xs text-foreground/30 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-foreground text-background border-foreground hover:opacity-90 transition-opacity"
                  >
                    <FolderOpen className="h-3.5 w-3.5" /> Open
                  </button>
                  <button
                    onClick={() => handleExport(project)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-background text-foreground/60 border-foreground/10 hover:border-foreground/20 hover:text-foreground transition-all"
                  >
                    <Download className="h-3.5 w-3.5" /> Export
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-background text-coral/60 border-coral/15 hover:bg-coral/5 hover:text-coral hover:border-coral/25 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
