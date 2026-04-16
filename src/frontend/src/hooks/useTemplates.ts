import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Template } from "../types";

interface TemplatesActor {
  listTemplates: () => Promise<Template[]>;
  getTemplate: (id: bigint) => Promise<Template | null>;
}

export function useTemplates() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async () => {
      if (!actor) return MOCK_TEMPLATES;
      try {
        const result = await (
          actor as unknown as TemplatesActor
        ).listTemplates();
        return result.length > 0 ? result : MOCK_TEMPLATES;
      } catch {
        return MOCK_TEMPLATES;
      }
    },
    enabled: !actorFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTemplate(id: bigint) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Template | null>({
    queryKey: ["template", id.toString()],
    queryFn: async () => {
      if (!actor) return MOCK_TEMPLATES.find((t) => t.id === id) ?? null;
      return (actor as unknown as TemplatesActor).getTemplate(id);
    },
    enabled: !actorFetching,
  });
}

// Mock templates for initial display
const MOCK_TEMPLATES: Template[] = [
  {
    id: BigInt(1),
    name: "Obsidian Elite",
    description:
      "Sleek dark carbon design with gold accents. Perfect for executives.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
  {
    id: BigInt(2),
    name: "Arctic Minimal",
    description:
      "Clean white-silver design for a professional first impression.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
  {
    id: BigInt(3),
    name: "Teal Pulse",
    description: "Vibrant teal gradient with tech-forward aesthetics.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
  {
    id: BigInt(4),
    name: "Violet Luxe",
    description: "Deep violet with metallic shimmer. Luxurious and memorable.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
  {
    id: BigInt(5),
    name: "Rose Gold",
    description: "Warm rose gold tones for a distinctive personal brand.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
  {
    id: BigInt(6),
    name: "Midnight Navy",
    description: "Deep navy with silver embossing for timeless elegance.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg",
  },
];
