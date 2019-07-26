import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    console.log(newFilter)
    props.changeFilter(newFilter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
    null,
    { changeFilter }
)(Filter)