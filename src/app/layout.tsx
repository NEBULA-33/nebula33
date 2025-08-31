/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Uyarı: Bu ayar, projenizde ESLint hataları olsa bile
    // production build'lerinin başarıyla tamamlanmasını sağlar.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;