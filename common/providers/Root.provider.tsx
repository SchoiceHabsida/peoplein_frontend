'use client'
 
import { AuthProvider } from '@/common/components/auth'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';
import { BASE_API } from '@/common/constants';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: BASE_API
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// create the apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

 
export function RootProvider({ children }: {
    children: React.ReactNode
  }) {
  return (
    <ApolloProvider client={client}>
    <AuthProvider>
        {children}
    </AuthProvider>
  </ApolloProvider>
  )
}