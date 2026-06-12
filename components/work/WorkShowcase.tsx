"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { useLenis, scrollToAndFocus } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ProjectSection } from "./ProjectSection";

/**
 * Juan Mora-style sticky scroll-spy (PRD §5.2), accessible version:
 * - the index is a real <nav aria-label="Projects">
 * - IntersectionObserver drives the visual active state AND aria-current
 * - activating a link scrolls (smooth only when motion allowed) and
 *   moves focus to the project heading, so keyboard/SR users land there
 */
export function WorkShowcase({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sections =
      containerRef.current?.querySelectorAll<HTMLElement>("section[id]");
    if (!sections?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      // a narrow horizontal band ~1/3 down the viewport decides "active"
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [projects]);

  const handleIndexClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    const heading = document.getElementById(`project-${slug}`);
    if (!heading) return; // fall through to default anchor behavior
    event.preventDefault();
    scrollToAndFocus(heading, lenisRef.current, reducedMotion);
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[240px_1fr]"
    >
      <nav
        aria-label="Projects"
        className="top-28 z-10 hidden self-start lg:sticky lg:block"
      >
        <ul className="flex flex-col gap-1 border-l border-border-soft">
          {projects.map((project) => {
            const active = activeSlug === project.slug;
            return (
              <li key={project.slug}>
                <a
                  href={`#${project.slug}`}
                  aria-current={active ? "true" : undefined}
                  onClick={(event) => handleIndexClick(event, project.slug)}
                  className={`-ml-px block border-l-2 py-2 pl-4 pr-2 text-sm no-underline transition-colors ${
                    active
                      ? "border-link font-semibold text-text"
                      : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  {project.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        {projects.map((project) => (
          <ProjectSection key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
