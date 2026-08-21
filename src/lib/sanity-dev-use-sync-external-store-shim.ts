// Sanity's development dependency graph can reach the CommonJS shim directly.
// React 19 already exposes the same hook as a native ESM export.
export { useSyncExternalStore } from "react";
