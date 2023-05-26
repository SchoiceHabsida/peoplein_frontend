'use client';

import { createContext, useContext, useCallback, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { ROUTE_HOME, ROUTE_LOGIN } from "@/common/constants";
import { useRouter } from 'next/navigation';

const ME_QUERY = gql`
  query me {
    getCurrentUser {
      id
      username
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
    }
  }
`;

const AuthContext = createContext({});

const useAuthProvider = () => {
  const { client, loading, error, data, refetch } = useQuery(ME_QUERY);
  const [loginMutation, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
  const router = useRouter()

  const [mockUser, setMockUser] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<any>(null)

  const login = useCallback(({ username, password }: any) => {
    
    loginMutation({ variables: { username, password } })
      .then(({ data }) => {
        const storage =  localStorage;
        storage.setItem('token', data.login.token);
        router.push(ROUTE_HOME);
        setMockUser('mockuser')
        // refetch();
      }).catch(error => {
        setLoginError(error)
      });
  }, [loginMutation, refetch]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    client.resetStore();
    router.push(ROUTE_LOGIN);
  }, [client, router]);

  return {
    loading: loading || mutationLoading,
    error,
    loginError,
    user: mockUser,
    // user: data && data.getCurrentUser && {
    //   ...data.getCurrentUser,
    //   role: data.getCurrentUser.roles[0].name
    // },
    login,
    logout
  };
}

const useAuth = () => {
  return useContext(AuthContext);
}

function AuthProvider({ children }: any) {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {
        typeof auth.user === 'undefined' && !auth.error
        ?  <div>Loading...</div>
        : children
      }
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
  useAuth,
};
