import type { Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { MediaGallery } from "@/components/ui/MediaGallery";
import { Reveal } from "@/components/motion/Reveal";
import { TagChips } from "./TagChips";

/**
 * One project block (PRD §5.2): heading + year pill, live/repo actions,
 * Challenge / Services / Role, media. The heading carries tabIndex={-1}
 * so index links can move focus here after scrolling.
 */
export function ProjectSection({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`;

  return (
    <section
      id={project.slug}
      aria-labelledby={headingId}
      className="scroll-mt-28 border-t border-border-soft py-16 first:border-t-0 first:pt-4"
    >
      <div className="flex flex-wrap items-center gap-4">
        <h2
          id={headingId}
          tabIndex={-1}
          className="font-display text-h2 font-semibold"
        >
          {project.title}
        </h2>
        <Pill>{project.year}</Pill>
      </div>

      {project.period && (
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          {project.period}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <ButtonLink href={project.liveUrl} external>
            View live<span className="sr-only">: {project.title}</span>
          </ButtonLink>
        )}
        {project.repoUrl && (
          <ButtonLink href={project.repoUrl} variant="ghost" external>
            View repo<span className="sr-only">: {project.title}</span>
          </ButtonLink>
        )}
        {/* No public link (internal/research work): show a context badge instead */}
        {!project.liveUrl && !project.repoUrl && project.context && (
          <Pill>{project.context}</Pill>
        )}
      </div>

      <Reveal as="div" className="mt-8">
        {/* Challenge + Services share the top row; Role drops to its own
            full-width row below so a short Challenge doesn't leave dead space. */}
        <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Challenge
            </h3>
            <p className="mt-2 max-w-prose">{project.challenge}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Services
            </h3>
            <div className="mt-2">
              <TagChips tags={project.services} />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border-soft/60 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Role
          </h3>
          <p className="mt-2 max-w-3xl text-sm">{project.role}</p>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <MediaGallery items={[project.media, ...(project.gallery ?? [])]} />
      </Reveal>
    </section>
  );
}
