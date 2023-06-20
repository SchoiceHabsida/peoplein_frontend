'use client';

import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { ROUTE_ADMIN, ROUTE_DASHBOARD, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PEOPLE } from "@/common/constants";
import { useRouter } from 'next/navigation';
import { IUser } from '../models/base.models';

const ME_QUERY = gql`
  query me {
    getCurrentUser{
      id
      username
      company {
        id
        name
      }
      roles{
        id
        name
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const AuthContext = createContext({});

const useAuthProvider = () => {

  const { client, loading, error, data: userData, refetch, } =
    useQuery<{ getCurrentUser: IUser }>(ME_QUERY, { fetchPolicy: 'no-cache' });
  const [loginMutation, { loading: mutationLoading }] = useMutation(LOGIN_MUTATION);
  const router = useRouter()

  const [user, setUser] = useState<IUser | null>(null)
  const [loginError, setLoginError] = useState<any>(null)

  const login = useCallback(({ username, password, is_admin }: { username: string; password: string; is_admin?: boolean }) => {

    loginMutation({ variables: { username, password } })
      .then(({ data }) => {
        setLoginError(null)
        const storage = localStorage;
        refetch();
        storage.setItem('token', data.login.token);
        router.push(`${is_admin ? `${ROUTE_ADMIN}/${ROUTE_DASHBOARD}/${ROUTE_PEOPLE}` : ROUTE_HOME}`);
      }).catch(error => {
        setLoginError(error)
      });
  }, [loginMutation, refetch]);

  useEffect(() => {
    setUser(userData?.getCurrentUser ? { ...userData?.getCurrentUser} : null)
  }, [userData])

  const logout = useCallback((is_admin?: boolean) => {
    localStorage.removeItem('token');
    router.push(is_admin ? `${ROUTE_ADMIN}${ROUTE_LOGIN}` : ROUTE_LOGIN);
    setUser(null);
    refetch()
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
