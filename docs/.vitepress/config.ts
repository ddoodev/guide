import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Discordoo',
  description: 'Guide for entire Discordoo ecosystem',
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Volume One: Discordoo',
          children: [
            { text: 'Introduction', link: '/index' },
            { text: 'Concepts', link: '/part-one/concepts' },
            { text: 'Intents', link: '/part-one/intents' }
          ]
        }
      ]
    }
  }
})
