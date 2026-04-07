import {
  mandalorian_hook,
  mandalorian_route_why,
  mandalorian_world,
  mandalorian_character,
  mandalorian_theme,
  mandalorian_cta,
} from "./blocks/mandalorian_blocks";

import {
  andor_hook,
  andor_route_why,
  andor_world,
  andor_character,
  andor_theme,
  andor_cta_no_spoiler,
  andor_cta_with_spoiler,
} from "./blocks/andor_blocks";

import type { PageBlock } from "../types";

export const allBlocks: PageBlock[] = [
  mandalorian_hook,
  mandalorian_route_why,
  mandalorian_world,
  mandalorian_character,
  mandalorian_theme,
  mandalorian_cta,
  andor_hook,
  andor_route_why,
  andor_world,
  andor_character,
  andor_theme,
  andor_cta_no_spoiler,
  andor_cta_with_spoiler,
];

export const blockIndex: Record<string, PageBlock> = Object.fromEntries(
  allBlocks.map((b) => [b.id, b])
);

export { routes } from "./routes";
