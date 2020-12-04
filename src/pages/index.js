import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import '../components/layout.css'
import Select, { components } from 'react-select'
import makeAnimated from 'react-select/animated'
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
const Container = styled.div`
  margin: 2vh 2vw;
  max-width: 800px;
`

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#a8a8a8' : '#fff',
    backgroundColor: state.isSelected ? '#4b4e53' : '#000',
    backgroundColor: state.isFocused ? '#4b4b4b' : '#000',
    padding: 20,
    width: 200
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    margin: '0 1rem 0',
    display: 'flex',
    color: '#fff'
  }),
  menu: () => ({
    width: 200,
    margin: '0 1rem 0'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: 'white' };
  }
}

const IndexPage = () => {
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedStack, setSelectedStack] = useState(null)

  // Create select options
  const { projects } = useStaticQuery(pageQuery)
  const nodes = [...projects.nodes]

  // Year
  const allYears = 'All years'
  const years = []
  const optionsYear = [{ 
    value: allYears,
    label: allYears
  }]
  nodes.forEach(node => years.push(node.year))
  const uniqueYears = years.filter((year, index) => {
    return years.indexOf(year) === index
  })
  uniqueYears.sort().forEach(year => {
    optionsYear.push({ 
      value: year,
      label: year
    })
  })

  // Stack
  const allTech = 'All tech'
  const stacks = []
  const optionsStack = [{ 
    value: allTech,
    label: allTech
  }]
  console.log(nodes)
  nodes.forEach(node => {
    node.stack.forEach(tech => {
      stacks.push(tech)
    })
  })
  const uniqueStack = stacks.filter((stack, index) => {
    return stacks.indexOf(stack) === index
  })
  uniqueStack.sort().forEach(stack => {
    optionsStack.push({ 
      value: stack,
      label: stack
    })
  })

  // Change state based on option selected
  const handleChangeYear = ({ value }) => {
    setSelectedYear(value)
  }

  const handleChangeStack = ({ value }) => {
    setSelectedStack(value)
  }

  return (
  <Container className='flex'>
    <Title>Projects</Title>
    <Select
      options={optionsYear} 
      styles={customStyles}
      onChange={(value) => handleChangeYear(value)}
      autoFocus={true}
      components={makeAnimated()}
      defaultValue={optionsYear[0]}
    />
    <Select
      options={optionsStack} 
      styles={customStyles}
      onChange={(value) => handleChangeStack(value)}
      autoFocus={true}
      components={makeAnimated()}
      defaultValue={optionsStack[0]}
    />
    {projects.nodes.map(({ slug, year, stack, ...project }, index) => {
      if ( 
        ((selectedYear === allYears || selectedYear === null) && (selectedStack === allTech || selectedStack === null)) ||
        (stack.includes(selectedStack) && selectedYear === year) ||
        (stack.includes(selectedStack) && (selectedYear === allYears || selectedYear === null)) ||
        (selectedYear === year && (selectedStack === allTech || selectedStack === null))
      ) { 
        return (
          <div className='card' key={index}>
            <Link className='card-title' key={slug} to={`/projects/${slug}`}>
              <h2>{project.title}</h2>
            </Link>
            <div className='card-flags'>
            {year}
            </div>
            <div className='card-flags'>
              {stack.map((tech, index) => (
                <div className='card-flag' key={index}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )
      }
    })}
  </Container>
  )
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
