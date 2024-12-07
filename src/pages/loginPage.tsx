import { useEffect } from 'react';

import { gql, useApolloClient } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

function LoginPage() {
  const apolloClient = useApolloClient();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
  });

  const onSubmit = async (formData) => {
    try {
        const { data } = await apolloClient.mutate({
          mutation: LOGIN_MUTATION,
          variables: formData
        });
    
        localStorage.setItem('LOGIN_KEY', data?.login);
    
        navigate('/')
    } catch (err) {
        alert(JSON.stringify(err, null, 2))
    }
  };

  useEffect(() => {
    if (localStorage.getItem('LOGIN_KEY')) {
        navigate('/')
    }
  }, [navigate])

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'darkgray',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        height:'100vh',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          height: 400,
          justifyContent: 'center',
          padding: 40,
          width: 400,
        }}
      >
        <h1>
          Notes App
        </h1>

        <input
          placeholder='Username'
          {...register('username')}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            color: 'black',
            marginTop: 40,
            padding: 10,
            width: '100%'
          }}
        />
        <input
          placeholder='Password'
          {...register('password')}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            color: 'black',
            marginTop: 10,
            padding: 10,
            width: '100%'
          }}
          type='password'
        />

        <button
          onClick={handleSubmit(onSubmit)}
          style={{
            marginTop: 40,
            width: '107%'
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginPage;

