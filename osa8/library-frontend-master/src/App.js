import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient} from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/loginForm'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `
const ALL_BOOKS = gql`
  {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`


const ME = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $authorname: String!, $genres: [String!]! ) {
    addBook(
      title: $title,
      published: $published,
      authorname: $authorname,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
const EDIT_BIRTHYEAR = gql`
  mutation editAuthorM($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`


const App = () => {
  console.log('app started')
  const [page, setPage] = useState('authors')
  const [token, setToken ] = useState(null)
  


  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
   
  const visibleForLogged = {
    display: 'none'
  }
  if (localStorage.getItem('library-user-token') || token){
    visibleForLogged.display = 'inline-block'
  } else {
    visibleForLogged.display = 'none'
  }
  const notVisibleForLogged = {
    disply: 'none'
  }
  if (localStorage.getItem('library-user-token') || token){
    notVisibleForLogged.display = 'none'
  } else {
    notVisibleForLogged.display = 'inline-block'
  }

  const Buttons = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style = {visibleForLogged} onClick={() => setPage('add')}>add book</button>
        <button style = {visibleForLogged} onClick={() => setPage('recommend')}>recommend</button>
        <button style = {notVisibleForLogged} onClick={() => setPage('login')}>login</button>
        <button style = {visibleForLogged} onClick={() => logout()}>log out</button>
      </div>
    )
  }
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries:[{query: ALL_AUTHORS}, {query:ALL_BOOKS}]
  })

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
      refetchQueries:[{query: ALL_AUTHORS}]
  })

  const handleError = () => {
      return
  }
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })
 
  if (page === 'login' ) {
    return (
      <div>
        <Buttons />
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }
  
  
  if (page === 'authors') {
    console.log('authors started')
    return (
      <div>
        <Buttons/>
        <Authors result = {authorsResult} editBirthYear = {editBirthYear}/>
      </div>
    )
  }
  else if (page === 'books') {
    return(
      <div>
        <Buttons/>
        <Books result = {booksResult}/>
      </div>
    )
  }
  else if (page === 'recommend') {
    return(
      <div>
        <Buttons/>
        <Recommend result = {me}/>
      </div>
    )
  }
  else if (page === 'add') {
    return (
      <div>
        <Buttons/>
        <NewBook addBook = {addBook}/>
      </div>
    )
  }
}

export default App