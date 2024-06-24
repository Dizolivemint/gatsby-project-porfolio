import React, { useEffect, useState } from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from '../apollo/client';
import { Link } from 'gatsby';
import '../components/layout.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from 'styled-components';

const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
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
`;

const Title = styled.h1`
  width: 100%;
  margin: 1rem;
`;

const Container = styled.div`
  margin: 2vh 2vw;
  max-width: 800px;
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#a8a8a8' : '#fff',
    backgroundColor: state.isSelected || state.isFocused ? '#4b4e53' : '#000',
    padding: '1rem',
    width: '10rem',
  }),
  control: () => ({
    width: '10rem',
    margin: '0 1rem 0',
    display: 'flex',
    color: '#fff',
  }),
  menu: () => ({
    width: '11rem',
    margin: '0 1rem 0',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: 'white' };
  },
};

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);
  const allTech = 'All tech';
  const [selectedStack, setSelectedStack] = useState(allTech);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredProjects(data.projects.nodes);
    }
  }, [data]);

  useEffect(() => {
    if (selectedStack === allTech) {
      setFilteredProjects(data.projects.nodes);
    } else {
      setFilteredProjects(
        data.projects.nodes.filter((project) => project.stack.includes(selectedStack))
      );
    }
  }, [selectedStack, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const stacks = [];
  const optionsStack = [{ value: allTech, label: allTech }];
  data.projects.nodes.forEach((node) => {
    node.stack.forEach((tech) => {
      stacks.push(tech);
    });
  });

  const uniqueStack = stacks.filter((stack, index) => stacks.indexOf(stack) === index);
  uniqueStack.sort().forEach((stack) => {
    optionsStack.push({ value: stack, label: stack });
  });

  const handleChangeStack = ({ value }) => {
    setSelectedStack(value);
  };

  return (
    <Container className="flex">
      <Title>Projects</Title>
      <div style={{ padding: '0 1em', width: '100%' }}>
        <p>Filter by technology (e.g., React, Node, Python)</p>
      </div>
      <Select
        options={optionsStack}
        styles={customStyles}
        onChange={(value) => handleChangeStack(value)}
        components={makeAnimated()}
        defaultValue={optionsStack[0]}
      />
      {filteredProjects.map(({ slug, stack, ...project }, index) => (
        <div className="card" key={index}>
          <Link className="card-title" key={slug} to={`/projects/${slug}`}>
            <h2>{project.title}</h2>
          </Link>
          <div className="card-flags">
            {stack.map((tech, index) => (
              <div className="card-flag" key={index}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};

const IndexPageWithProvider = () => (
  <ApolloProvider client={client}>
    <IndexPage />
  </ApolloProvider>
);

export default IndexPageWithProvider;
