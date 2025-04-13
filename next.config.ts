const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      util: false,
      assert: false,
      buffer: false,
      module: false,
      http2: false,
      tls: false,
      net: false,
    };

    // Exclude firebase-admin from the client-side bundle
    config.externals = {
      ...(config.externals || {}),
      "firebase-admin": "commonjs firebase-admin",
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
