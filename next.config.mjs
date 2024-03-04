/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["www.coop.ch", "www.migros.ch", "aldi-suisse.ch", "denner.ch"], // Замените на домен, с которого загружаются ваши изображения
  },
};

export default nextConfig;
