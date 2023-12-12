/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images:{
    remotePatterns : [
      {
        protocol:"https",
        hostname:"res.cloudinary.com"
      },
      {
        protocol:"https",
        hostname:"afdhgsqqmrpauyodkafg.supabase.co"
      }
    ]
  }
}

module.exports = nextConfig
