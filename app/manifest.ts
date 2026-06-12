import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Showcase',
    short_name: 'Showcase',
    description: 'A calmer, creator-focused social publishing app.',
    start_url: '/showcase/feed',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#b8541f',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
