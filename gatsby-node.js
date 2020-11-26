exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { projects },
  } = await graphql(`
    {
      projects: allGraphCmsProject {
        nodes {
          id
          slug,
          title,
          description,
          stack,
          contributor,
          url
        }
      }
    }
  `)

  projects.nodes.forEach(({ id, slug, title, description, stack, contributor, url }) =>
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
        url
      },
    })
  )
}
