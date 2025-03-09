import path from 'path';

export default {
  webpack: (config) => {
    config.resolve.alias['@modules'] = path.join(process.cwd(), 'src/modules');
    return config;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};
