import { Pill } from "@/components/ui/Pill";

export function TagChips({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Pill>{tag}</Pill>
        </li>
      ))}
    </ul>
  );
}
