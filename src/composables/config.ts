import type { SiteConfig } from '../types'

export const useConfig = (): SiteConfig => ({
  head: {
    title: 'Blog',
    meta: [
      { name: 'description', content: 'Opinionated Vite Starter Template' },
      {
        name: 'theme-color',
        content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      },
    ],
  },
  nav: [
    {
      text: 'button.home',
      link: '/',
    },
    {
      text: 'button.about',
      link: '/about',
    },
    {
      text: 'button.blog',
      link: '/posts',
    },
    {
      text: 'button.archives',
      link: '/archives',
    },
    {
      text: 'button.tag',
      link: '/tag',
    },
    {
      text: 'button.note',
      link: '/note',
    },
  ],
})

