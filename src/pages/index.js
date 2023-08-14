import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import '../components/layout.css'
import Select from 'react-select'
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
        createdAt
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
    backgroundColor: state.isSelected || state.isFocused ? '#4b4e53' : '#000',
    padding: '1rem',
    width: '10rem'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '10rem',
    margin: '0 1rem 0',
    display: 'flex',
    color: '#fff'
  }),
  menu: () => ({
    width: '11rem',
    margin: '0 1rem 0'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: 'white' };
  }
}

const IndexPage = () => {
  const { projects } = useStaticQuery(pageQuery)
  projects.nodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const nodes = [...projects.nodes]

  const allTech = 'All tech'
  const [selectedStack, setSelectedStack] = useState(allTech)
  const [selectedProjects, setProjects] = useState(projects)

  // Create select options
  

  // // Year
  // const allYears = 'All years'
  // const years = []
  // const optionsYear = [{ 
  //   value: allYears,
  //   label: allYears
  // }]
  // nodes.forEach(node => years.push(node.year))
  // const uniqueYears = years.filter((year, index) => {
  //   return years.indexOf(year) === index
  // })
  // uniqueYears.sort().forEach(year => {
  //   optionsYear.push({ 
  //     value: year,
  //     label: year
  //   })
  // })

  // Stack filter dropdown
  const stacks = []
  const optionsStack = [{ 
    value: allTech,
    label: allTech
  }]
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

  useEffect(() => {
    if (selectedStack === allTech) {
      setProjects(projects)
    } else {
      let filteredProjects = {}, projectArray = []
      for (const project of projects.nodes) {
        const { stack } = project
        if (stack.includes(selectedStack)) {
          projectArray.push(project)
          filteredProjects = { nodes: projectArray }
        } 
      }
      setProjects(filteredProjects)
      console.log(selectedProjects)
    }
  }, [selectedStack])
  

  // Change state based on option selected
  // const handleChangeYear = ({ value }) => {
  //   setSelectedYear(value)
  // }

  const handleChangeStack = ({ value }) => {
    setSelectedStack(value)
  }

  return (
  <Container className='flex'>
    <Title>Projects</Title>
    {/*<Select
      options={optionsYear} 
      styles={customStyles}
      onChange={(value) => handleChangeYear(value)}
      autoFocus={true}
      components={makeAnimated()}
      defaultValue={optionsYear[0]}
    />*/}
    <div style={{padding: '0 1em', width: '100%'}}>
      <p>Filter by technology (e.g., React, Node, Python)</p>
    </div>
    <Select
      options={optionsStack} 
      styles={customStyles}
      onChange={(value) => handleChangeStack(value)}
      components={makeAnimated()}
      defaultValue={optionsStack[0]}
    />
    {selectedProjects?.nodes?.map(({ slug, year, stack, ...project }, index) => {
        return (
          <div className='card' key={index}>
            <Link className='card-title' key={slug} to={`/projects/${slug}`}>
              <h2>{project.title}</h2>
            </Link>
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
    )}
  </Container>
  )
}

// const IndexPage = () => (<div>Hello</div>)
export default IndexPage
