import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// bring in ApolloClient, the cache where data and queries are cached and ApolloProvider which allows us to create a sort of global scope, the data wherein can be accessed by any child components
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// congfigure the ApolloClient
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(), // using browser cache
});

// make the ApolloProvider the parent for all other components and give it access to the ApolloClient. This ensures all components can get to the data from GraphQL

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path='/' 
              element={<SearchBooks />} 
            />
            <Route 
              path='/saved' 
              element={<SavedBooks />} 
            />
            <Route 
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
