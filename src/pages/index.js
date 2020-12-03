import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import '../components/layout.css'
import Select from 'react-select'
import styled from 'styled-components'
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
        year
        demo
      }
    }
  }
`
const Title = styled.h1`
  width: 100%;
  margin: 1rem;
` 

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    margin: '0 1rem 0',
    display: 'flex'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const IndexPage = () => {
  const [selected, setSelected] = useState(null)

  // Create select options
  const { projects } = useStaticQuery(pageQuery)
  const nodes = [...projects.nodes]
  const years = []
  const options = []
  nodes.forEach(t => years.push(t.year))
  const uniqueYears = years.filter((year, index) => {
    return years.indexOf(year) === index
  })
  uniqueYears.sort().forEach(year => {
    options.push({ 
      value: year,
      label: year
    })
  })

  // Change state based on option selected
  const handleChange = ({ value }) => {
    setSelected(value)
  }

  return (
  <div className='flex'>
    <Title>Projects</Title>
    <Select
      className={'select'} 
      options={options} 
      styles={customStyles}
      onChange={(value) => handleChange(value)}
    />
    {projects.nodes.map(({ slug, year, ...project }, index) => {
      if (selected === year || selected === null) { 
        return (
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
        )
      }
    })}
  </div>
  )
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
