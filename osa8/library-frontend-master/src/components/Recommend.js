import React, { useState } from 'react' 
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const RECOMMEND_BOOKS = gql`
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

const Recommend = ({result}) => {
    const client = useApolloClient(RECOMMEND_BOOKS)
    const [books, setBooks] = useState([])

    console.log('starting')
    if (result.loading) {
        return <div>loading...</div>
    }
    const showRecommend = async ( genre ) => {
        const { data } = await client.query({
            query: RECOMMEND_BOOKS,
            variables: {genre: genre}
        })
        console.log('setbooks')
        setBooks(data.allBooks)
    }
    console.log(result.data.me.favoriteGenre)
    showRecommend(result.data.me.favoriteGenre)
    if (books) {
        return(
            <div>
                <h2>Recommendations</h2>
                
                <p>books in your favorite genre {result.data.me.favoriteGenre}</p>
                
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
            </div>
        )
    }
    return (
        <div>loading</div>
    )
}

export default Recommend