import { c as createLucideIcon } from "./Layout-CES_Nuqd.js";
import "./index-BCepy_kX.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-DHItWJrm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
function useTemplates() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      if (!actor) return MOCK_TEMPLATES;
      try {
        const result = await actor.listTemplates();
        return result.length > 0 ? result : MOCK_TEMPLATES;
      } catch {
        return MOCK_TEMPLATES;
      }
    },
    enabled: !actorFetching,
    staleTime: 1e3 * 60 * 5
  });
}
const MOCK_TEMPLATES = [
  {
    id: BigInt(1),
    name: "Obsidian Elite",
    description: "Sleek dark carbon design with gold accents. Perfect for executives.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  },
  {
    id: BigInt(2),
    name: "Arctic Minimal",
    description: "Clean white-silver design for a professional first impression.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  },
  {
    id: BigInt(3),
    name: "Teal Pulse",
    description: "Vibrant teal gradient with tech-forward aesthetics.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  },
  {
    id: BigInt(4),
    name: "Violet Luxe",
    description: "Deep violet with metallic shimmer. Luxurious and memorable.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  },
  {
    id: BigInt(5),
    name: "Rose Gold",
    description: "Warm rose gold tones for a distinctive personal brand.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  },
  {
    id: BigInt(6),
    name: "Midnight Navy",
    description: "Deep navy with silver embossing for timeless elegance.",
    previewImageUrl: "/assets/generated/nfc-hero.dim_1200x700.jpg"
  }
];
export {
  Check as C,
  useTemplates as u
};
