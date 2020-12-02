import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import '../components/layout.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

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
  const { projects } = useStaticQuery(pageQuery)
  let options = []
  projects.nodes.array.forEach(project => {
    options.push(project.year)
  })
  const defaultOption = options[0];

  return (
  <div className='flex'>
    <h1>Projects</h1>
    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Year" />
    {projects.nodes.map(({ slug, year, ...project }, index) => (
      <div className='card' key={index}>
        <Link className='card-title' key={slug} to={`/projects/${slug}`}>
          <h2>{project.title}</h2>
        </Link>
        <div className='card-flags'>
        {year}
        </div>
        <div className='card-flags'>
          {project.stack.map((stack, index) => (
            <div className='card-flag' key={index}>
              {stack}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>)
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
