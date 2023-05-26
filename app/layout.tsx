"use client"
import { AuthProvider } from '@/common/components/auth'
import '../css/globals.css'
import { Inter } from 'next/font/google'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';
// import { createUploadLink } from 'apollo-upload-client'
import { BASE_API } from '@/common/constants';
import { createUploadLink } from 'apollo-upload-client';

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <ApolloProvider client={client}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}
