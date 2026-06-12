import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { WorkShowcase } from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — accessibility engineering and creative technology by Jassim M. Shamim.",
};

export default function WorkPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6">
        <h1 className="font-display text-h1 font-semibold">Work</h1>
        <p className="mt-3 max-w-xl text-text-muted">
          Selected projects where craft and accessibility are the same goal.
        </p>
      </div>
      <WorkShowcase projects={projects} />
    </>
  );
}
