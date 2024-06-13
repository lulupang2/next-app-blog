/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    splitChunks: { pages: true },
  },
};

export default nextConfig;
