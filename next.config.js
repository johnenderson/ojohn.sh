/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/johnenderson',
        permanent: false,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/john-enderson-8139bb2a',
        permanent: false,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/johnenderson',
        permanent: false,
      },
    ];
  },
};
