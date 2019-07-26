import React, { useState } from 'react'
import '../index.css'


const Authors = ({ result, editBirthYear }) => {
  
  const [ name, setName ] = useState('')
  const [ setBornTo, setSetBornTo ] = useState('')
  

  const visibleForLogged = {
    visibility: 'hidden'
  }
  
  if (localStorage.getItem('library-user-token')){
    visibleForLogged.visibility = 'visible'
  } else {
    visibleForLogged.visibility = 'hidden'
  }

  const submit = async ( e ) => {
    e.preventDefault()
    await editBirthYear({
      variables: { name, setBornTo}
    })

    setSetBornTo('')
    setName('')
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.data === undefined) {
    console.log('undefined')
    return <div>undefined</div>
  }
  if (result.data.allAuthors[0] !== undefined && name === '') {
    setName(result.data.allAuthors[0].name)
  }
  
  const options = result.data.allAuthors.map(a => 
    <option value = {a.name} key = { a.name}>{a.name}</option> 
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style = {visibleForLogged}>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name <select value = {name} onChange = {({ target}) => setName(target.value)}>
              {options} 
            </select>

          </div>
          <div>
            birthyear <input
              value={setBornTo}
              onChange={({ target }) => setSetBornTo(Number(target.value))}
            />
          </div>
          <button type='submit'>edit birthyear</button>
        </form>
      </div>
    </div>
  )
}

export default Authors


/*
 <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>

*/