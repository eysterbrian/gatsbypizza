import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // This might be the default, but make it explicit

export default {
  siteMetadata: {
    title: "Slick's Slices",
    description: "Lyons' finest pizza shack",
  },
  plugins: [
    'gatsby-plugin-styled-components',
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
