"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { useLenisInstance, scrollToAndFocus } from "@/lib/scroll";
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
  const lenisRef = useLenisInstance();
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
    scrollToAndFocus(heading, lenisRef?.current ?? null, reducedMotion);
  };

  return (
    <div
      ref={containerRef}
      className="grid gap-x-16 gap-y-10 px-6 sm:px-10 xl:px-16 lg:grid-cols-[240px_minmax(0,1fr)]"
    >
      <nav
        aria-label="Projects"
        className="top-28 z-10 hidden self-start lg:sticky lg:block"
      >
        <ul className="flex flex-col gap-2">
          {projects.map((project) => {
            const active = activeSlug === project.slug;
            return (
              <li key={project.slug}>
                <a
                  href={`#${project.slug}`}
                  aria-current={active ? "true" : undefined}
                  onClick={(event) => handleIndexClick(event, project.slug)}
                  className={`group flex items-center gap-3 rounded-pill p-2 text-sm no-underline transition-colors ${
                    active
                      ? "bg-surface-2 font-semibold text-text"
                      : "text-text-muted hover:bg-surface-2/60 hover:text-text"
                  }`}
                >
                  {/* dot: blue + filled when active, hairline otherwise (decorative) */}
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full transition-colors ${
                      active
                        ? "bg-link"
                        : "bg-border-soft group-hover:bg-text-muted"
                    }`}
                  />
                  <span className="truncate">{project.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cap the card column so lines stay readable on ultrawide / zoomed-out
          viewports; the nav stays anchored left and extra width spills right. */}
      <div className="w-full max-w-[72rem]">
        {projects.map((project) => (
          <ProjectSection key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
