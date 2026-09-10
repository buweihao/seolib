import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";
import { componentRegistry } from "../src/config/component-registry.ts";

const workspaceRoot = process.cwd();
const componentsRoot = join(workspaceRoot, "src/components");
const internalReviewComponents = new Set([
  "src/components/patterns/ComponentRegistryIndex.astro",
  "src/components/patterns/PatternReview.astro",
]);

const astroFiles = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) return astroFiles(path);
  return entry.name.endsWith(".astro") ? [relative(workspaceRoot, path).replaceAll("\\", "/")] : [];
});

test("component registry has unique IDs and source files", () => {
  assert.equal(new Set(componentRegistry.map((entry) => entry.id)).size, componentRegistry.length);
  for (const entry of componentRegistry) assert.equal(existsSync(join(workspaceRoot, entry.source)), true, `${entry.id} source is missing`);
});

test("every user-facing Astro component is registered", () => {
  const registeredSources = new Set(componentRegistry.map((entry) => entry.source));
  const unregistered = astroFiles(componentsRoot).filter((source) => !internalReviewComponents.has(source) && !registeredSources.has(source as typeof componentRegistry[number]["source"]));
  assert.deepEqual(unregistered, []);
});

test("component library document contains every registered ID", () => {
  const document = readFileSync(join(workspaceRoot, "docs/COMPONENT_LIBRARY.md"), "utf8");
  const undocumented = componentRegistry.filter((entry) => !document.includes(`\`${entry.id}\``)).map((entry) => entry.id);
  assert.deepEqual(undocumented, []);
});
