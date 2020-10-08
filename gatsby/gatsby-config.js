import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // This might be the default, but make it explicit

export default {
  siteMetadata: {
    title: "Slick's Slices",
    titleTemplate: '%s - Slicks Slices',
    description: "Lyons' finest pizza shack",
    twitterUsername: '@slicksslices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'rjn7udu9',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
