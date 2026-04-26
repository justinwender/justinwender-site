import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio bundles its own React contexts and styled-components; bundling
  // them through Turbopack's server pipeline triggers a CJS/ESM interop crash
  // ("createContext is not a function") during page-data collection at build.
  serverExternalPackages: ["sanity", "styled-components"],
};

export default nextConfig;
