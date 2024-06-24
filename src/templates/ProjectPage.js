import React from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from '../apollo/client';
import styled from 'styled-components';
import '../components/layout.css';

const Container = styled.div`
  margin: 2vh 2vw;
  max-width: 800px;
`;

const Title = styled.h1`
  width: 100%;
  margin: 1rem;
`;

const SubTitle = styled.h2`
  width: 100%;
  margin: 1rem;
`;

const Description = styled.p`
  width: 100%;
  margin: 1rem;
`;

const Links = styled.div`
  width: 100%;
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const Link = styled.a`
  width: 100%;
  color: #c7c7d9;
`;

const GET_PROJECT_QUERY = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      title
      description
      url
      year
      demo
    }
  }
`;

const ProjectPage = ({ pageContext: { id } }) => {
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;

  return (
    <Container>
      <Title>{project.title}</Title>
      <SubTitle>Description</SubTitle>
      <Description>{project.description}</Description>

      <Links>
        <Link href={project.url}>Code</Link>
        <Link href={project.demo}>Demo</Link>
      </Links>
    </Container>
  );
};

const ProjectPageWithProvider = (props) => (
  <ApolloProvider client={client}>
    <ProjectPage {...props} />
  </ApolloProvider>
);

export default ProjectPageWithProvider;
