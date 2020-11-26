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

  return (
  <div className='flex'>
    <h1>Projects</h1>
    {projects.nodes.map(({ slug, ...project }) => (
      <Link className='card' key={slug} to={`/projects/${slug}`}>
        <h2>{project.title}</h2>
      </Link>
    ))}
  </div>)
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
