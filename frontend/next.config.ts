import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              connect-src 'self'
                https://elyaitra-backend.onrender.com
                https://api.razorpay.com;
              img-src 'self' data:;
              script-src 'self'
                'unsafe-inline'
                'unsafe-eval'
                https://checkout.razorpay.com;
              frame-src
                https://api.razorpay.com
                https://checkout.razorpay.com;
              style-src 'self' 'unsafe-inline';
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
