const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'http://localhost:8000',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logoLink: '/',
    links: [{ text: '', link: '' }],
  },
  sidebar: {
    forcedNavOrder: [
      '/11-inspections',
      '/test',
    ],
    collapsedNav: [
      '/createInspections',
      '/inspectionTracking'
    ],
    links: [{ text: 'Автономные системы', link: 'https://auto-sys.su/' }],
    frontLine: false,
    ignoreIndex: true,
  },
  siteMetadata: {
    title: 'Gatsby Gitbook Boilerplate | Hasura',
    description: 'Documentation built with mdx. Powering hasura.io/learn ',
    ogImage: null,
    docsLocation: 'https://github.com/hasura/gatsby-gitbook-boilerplate/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
};

module.exports = config;
