import withBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true, // Not working with TanStack React Table pagination and sorting
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

const bundleAnalyzerEnabled = process.env.ANALYZE === "true";
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default bundleAnalyzerEnabled ? bundleAnalyzer(nextConfig) : nextConfig;
