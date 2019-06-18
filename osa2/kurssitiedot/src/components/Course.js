import React from 'react'

const Header = (props) => {
	return (
    <>
      <h3>
        {props.coursename}
      </h3>
    </>
  )
}

const Content = ({parts}) => {
  const rows = () => parts.map((part) =>
    <Part
    key = {part.id}
    part = {part}
    />
  )
  return (
    <>
      {rows()}
		</>	
  )
}

const Part= ({part}) => {
  return (
    <>
      <p>
			  {part.name} {part.exercises}
		  </p>
    </>
  )
}

const Total = ({parts}) => {
  
  const sum = parts.reduce( (s, p) => s+p.exercises, 0
  );

  return (
    <>
      <h5>Number of exercises {sum}</h5>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header coursename={course.name} />
      <Content parts = {course.parts} />
		  <Total parts = {course.parts}/>
    </>
  )
}
export default Course