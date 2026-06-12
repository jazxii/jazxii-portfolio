import Link from "next/link";
import { projects } from "@/content/projects";
import { Pill } from "@/components/ui/Pill";
import { MediaFigure } from "@/components/ui/MediaFigure";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Selected-work teaser on the home route — a recruiter sees three
 * projects within seconds (PRD §2). Cards deep-link into /work.
 */
export function WorkTeaser() {
  const selected = projects.slice(0, 3);

  return (
    <section
      aria-labelledby="selected-work-heading"
      className="mx-auto mt-28 max-w-6xl px-4 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="selected-work-heading" className="font-display text-h2 font-semibold">
          Selected work
        </h2>
        <ButtonLink href="/work" variant="ghost">
          All projects
        </ButtonLink>
      </div>

      <ul className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-3">
        {selected.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work#${project.slug}`}
              className="group block rounded-card no-underline"
            >
              <MediaFigure
                media={project.media}
                className="transition-transform duration-200 group-hover:scale-[1.01]"
              />
              <span className="mt-3 flex items-center gap-3 px-1 font-medium text-text">
                {project.title}
                <Pill>{project.year}</Pill>
              </span>
              <span className="mt-1 block px-1 text-sm text-text-muted">
                {project.services.slice(0, 2).join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
