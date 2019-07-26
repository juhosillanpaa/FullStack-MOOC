import React, { useState } from 'react'
import '../index.css'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [authorname, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const submit = async (e) => {
    e.preventDefault()
    console.log(props)

    console.log('add book...')
    await props.addBook({
      variables: {title, authorname, published, genres}
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  const visibleForLogged = {
    visibility: 'visible'  
}

  if (localStorage.getItem('library-user-token')){
    visibleForLogged.visibility = 'visible'
  } else {
    visibleForLogged.visibility = 'hidden'
  }
  return (
    <div style = {visibleForLogged}>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={authorname}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook