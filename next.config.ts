import withBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import * as process from "node:process";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true, // Not working with TanStack React Table pagination and sorting
    serverActions: {
      bodySizeLimit: `${parseFloat(process.env.BLOB_MAX_FILE_SIZE || "4.5")}mb`, // Increased limit for server actions to accommodate larger payloads for file uploads
    },
    useCache: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "l0r78fsrrgqfhiu2.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

const bundleAnalyzerEnabled = process.env.ANALYZE === "true";
const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default bundleAnalyzerEnabled ? bundleAnalyzer(nextConfig) : nextConfig;
