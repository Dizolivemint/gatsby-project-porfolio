import React from 'react'
import { graphql } from 'gatsby'

const ProjectPage = ({ data: { project } }) => (
  <React.Fragment>
    <h1>{project.title}</h1>
    <h2>Description</h2>
    <p>{project.description}</p>
    <h2>URL</h2>
    <p>
      <a href={project.url}>project.url</a>
    </p>
  </React.Fragment>
)

export const pageQuery = graphql`
  query ProjectPageQuery($id: String!) {
    project: graphCmsProject(id: { eq: $id }) {
      title
      description
      url
    }
  }
`

export default ProjectPage
