import { createClient, type SanityClient } from "@sanity/client";

export interface SanityRuntimeConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
}

export const readSanityRuntimeConfig = (): SanityRuntimeConfig | undefined => {
  const env = import.meta.env;
  const projectId = env.PUBLIC_SANITY_PROJECT_ID?.trim();

  if (!projectId) return undefined;

  return {
    projectId,
    dataset: env.PUBLIC_SANITY_DATASET?.trim() || "production",
    apiVersion: env.PUBLIC_SANITY_API_VERSION?.trim() || "2026-08-01",
  };
};

export const createPublishedSanityClient = (config: SanityRuntimeConfig): SanityClient =>
  createClient({
    ...config,
    useCdn: false,
    perspective: "published",
  });
