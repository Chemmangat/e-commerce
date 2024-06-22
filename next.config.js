/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-url",
            value: "/:path*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
