import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import '../components/layout.css'

const pageQuery = graphql`
  {
    projects: allGraphCmsProject {
      nodes {
        title
        description
        url
        slug
        stack
        contributor
      }
    }
  }
`

const IndexPage = () => {
  const { projects } = useStaticQuery(pageQuery);

  return projects.nodes.map(({ slug, ...project }) => (
    <Link key={slug} to={`/projects/${slug}`}>
      {project.title}
    </Link>
  ))
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
