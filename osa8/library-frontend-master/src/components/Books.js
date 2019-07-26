import React, { useState }from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'


const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
          name
          born
      }
    }
  }
`
const Books = ({result}) => {
  const [genre, setGenre] = useState('')
  const [ books, setBooks ] = useState([])
  const client = useApolloClient(BOOKS_BY_GENRE)
  let allGenres = []

  const genreHandler = async (genre) => {
    console.log(`${genre}`)
    setGenre(genre)
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre: genre}
    })
    setBooks(data.allBooks)
    console.log(`books are set and they are ${books}`)
  }
  
  
  if (result.data.allBooks !== undefined) {
    console.log(result.data.allBooks)
    result.data.allBooks.forEach(book => {
      book.genres.forEach(genre => {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre)
        }
      })
    })
    allGenres = allGenres.map(genre => 
      <button key = {genre} onClick = {(e) => genreHandler(genre)}>{genre}</button>
      )

  }
  if (result.loading) {
    return <div>loading...</div>
  } 

  else if (genre){
    return (
      <div>
      <h2>books</h2>
      <button onClick = {() => setGenre('')}>Show all</button>
      <p>In genre <strong>{genre}</strong></p>
    
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>{
            console.log('joojoo')
            console.log(a)
            return(
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)
          }
            
          )}
        </tbody>
      </table>
      {allGenres}
    </div>
    )
  }
  else {
    return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {allGenres}
    </div>
  )
  }
}

export default Books