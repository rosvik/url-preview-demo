/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "img.248.no",
      },
    ],
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
};

export default nextConfig;
