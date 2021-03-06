const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/TSMaker/'
  }
} : {}

module.exports = {
  mode: 'spa',
  ...routerBase,
  head: {
    title: '時間割メーカー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { property: 'og:title', content: '時間割メーカー' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: '時間割メーカー。簡単に1日のスケジュールを立てられるサービスです。朝に使うとより幸せになれます。' },
      { property: 'og:url', content: 'https://mitsudaman.github.io/TSMaker/' },
      { property: 'og:site_name', content: '時間割メーカー' },
      { property: 'og:image', content: 'https://mitsudaman.github.io/TSMaker/OGP.png' },
      { name: 'twitter:site', content: '@mitudama' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://mitsudaman.github.io/TSMaker/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    vendor: ['vue-swatches']
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  modules: [
    'bootstrap-vue/nuxt',

    // Or if you have custom bootstrap CSS...
    ['bootstrap-vue/nuxt', { css: false }],
    // google analytics 
    ['@nuxtjs/google-analytics', {
      id: 'UA-131448037-1'
    }]
  ],
}

