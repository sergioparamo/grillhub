// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Esto evitará que ESLint se ejecute durante las construcciones
    },
  };
  
  export default nextConfig;  