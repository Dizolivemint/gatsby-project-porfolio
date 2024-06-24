const fetch = require('node-fetch');
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const { HttpLink } = require('@apollo/client/link/http');

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHCMS_ENDPOINT,
    fetch,
  }),
  cache: new InMemoryCache(),
});

exports.createPages = async ({ actions: { createPage } }) => {
  const GET_PROJECTS_QUERY = gql`
    query GetProjects {
      projects {
        nodes {
          id
          slug
          title
          description
          stack
          contributor
          url
          year
          demo
        }
      }
    }
  `;

  const { data } = await client.query({ query: GET_PROJECTS_QUERY });
  const projects = data.projects.nodes;

  projects.forEach(({ id, slug, title, description, stack, contributor, url, year, demo }) =>
    createPage({
      path: `/projects/${slug}`,
      component: require.resolve(`./src/templates/ProjectPage.js`),
      context: {
        id,
        slug,
        title,
        description,
        stack,
        contributor,
        url,
        year,
        demo,
      },
    })
  );
};
