import { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LIST_NOTES_QUERY = gql`
    query ListNotes {
        listNotes {
            id
            title
            value
            owner {
                username
            }
        }
    }
`

const HomePage = () => {
    const navigate = useNavigate()

    const { data } = useQuery(LIST_NOTES_QUERY)

    const logOut = () => {
        localStorage.removeItem('LOGIN_KEY')

        navigate('/login')
    }

    useEffect(() => {
        if (localStorage.getItem('LOGIN_KEY') === null) {
            navigate('/login')
        }
    }, [navigate])

  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            alignItems: 'center'
        }}
    >

    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        minHeight: '100vh',
        width: '400px',
      }}
    >
        <div
            style={{
                display: 'flex',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <h2
                style={{
                    margin: 0,
                }}
            >
                Notes App
            </h2>

            <a
                href='\login'
                style={{
                    color: 'red',
                    cursor: 'pointer'
                }}
                onClick={logOut}
            >
                Log out
            </a>
        </div>

    <div
        style={{
            padding: '0px 20px 0px 20px'
        }}
    >

        {
            (data?.listNotes || []).map(item => {
            return (
                <div
                    style={{
                        border: '1px solid gray',
                        borderRadius: 10,
                        marginBottom: 20,
                        padding: 10,
                    }}
                >
                <a href='\' style={{cursor: 'pointer'}}>
                    {item?.owner?.username}
                </a>
                <h3
                    style={{
                        margin: '5px 0px 0px 0px',
                    }}
                >
                    {item?.title}
                </h3>
                <div>
                    {item?.value}
                </div>
                </div>
            )
            })
        }
    </div>
    </div>
    </div>
  )
}

export default HomePage;
