import ApolloClient from 'apollo-boost';

// Initialize Apollo Client with the URI of your GraphQL endpoint
const client = new ApolloClient({
  uri: process.env.GRAPHCMS_ENDPOINT, // Replace with your GraphQL endpoint
});

export default client;
