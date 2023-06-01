'use client';

import { createContext, useContext, useCallback, useState, useEffect } from 'react';
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

  const { client, loading, error, data: userData, refetch, } = useQuery<{ getCurrentUser: { id: string; username: string } }>(ME_QUERY);
  const [loginMutation, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
  const router = useRouter()

  const [user, setUser] = useState<{ id: string; username: string } | null>(null)
  const [loginError, setLoginError] = useState<any>(null)

  const login = useCallback(({ username, password }: any) => {

    loginMutation({ variables: { username, password } })
      .then(({ data }) => {
        setLoginError(null)
        const storage = localStorage;
        refetch();
        storage.setItem('token', data.login.token);
        router.push(ROUTE_HOME);
      }).catch(error => {
        setLoginError(error)
      });
  }, [loginMutation, refetch]);

  useEffect(() => {
    setUser(userData?.getCurrentUser || null)
  }, [userData])

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null)
    router.push(ROUTE_LOGIN);
  }, [client, router]);

  return {
    loading: loading || mutationLoading,
    error,
    loginError,
    user: user,
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
          ? <div>Loading...</div>
          : children
      }
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
  useAuth,
};
