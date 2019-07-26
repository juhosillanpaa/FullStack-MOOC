import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: ''
  }
  if (props.notification) { //this for removing the border
    console.log('there is notification')
    style.display = ''
  } else {
    console.log('no notification')
    style.display = 'none'
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(
  mapStateToProps
)(Notification)