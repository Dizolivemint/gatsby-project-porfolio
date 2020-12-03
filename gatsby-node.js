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
          url,
          year,
          demo
        }
      }
    }
  `)

  projects.nodes.forEach(({ id, slug, title, description, stack, contributor, url, year, demo }) =>
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
        demo
      },
    })
  )
}
