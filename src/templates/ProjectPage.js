import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import '../components/layout.css'

const Container = styled.div`
  margin: 2vh 2vw;
  max-width: 800px;
`

const Title = styled.h1`
  width: 100%;
  margin: 1rem;
` 

const SubTitle = styled.h2`
  width: 100%;
  margin: 1rem;
` 

const Description = styled.p`
  width: 100%;
  margin: 1rem;
` 

const Links = styled.div`
  width: 100%;
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
` 

const Link = styled.a`
  width: 100%;
  color: #c7c7d9;
` 

const ProjectPage = ({ data: { project } }) => (
  <React.Fragment>
    <Container>
      <Title>{project.title}</Title>
      <SubTitle>Description</SubTitle>
      <Description>{project.description}</Description>
      
      <Links>
        <Link href={project.url}>Code</Link>
        <Link href={project.demo}>Demo</Link>
      </Links>
    </Container>
  </React.Fragment>
)

export const pageQuery = graphql`
  query ProjectPageQuery($id: String!) {
    project: graphCmsProject(id: { eq: $id }) {
      title
      description
      url,
      year,
      demo
    }
  }
`

export default ProjectPage
