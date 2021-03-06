import React from 'react';
import ReactDOM from 'react-dom';

/*
  OSA1
  STEP 5 Done (1.5)
*/
const Header = (props) => {
	return (
        <>
        <h1>
            {props.coursename}
        </h1>
        </>
    )
}
const Content = (props) => {
    return(
        <>
            <Part part = {props.parts[0]} />	
            <Part part = {props.parts[1]} />
            <Part part = {props.parts[2]} />
		</>	
    )
}
 const Part= (props) => {
     return (
        <>
        <p>
			{props.part.name} {props.part.exercises}
		</p>
        

        </>
     )
}

const Total = (props) => {
    const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
        <>
        <p>Number of exercises {sum}</p>
        </>
    )
}





const App = () => {
	const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

	return (
		<div>
			<Header coursename={course.name} />
            <Content parts = {course.parts} />
			<Total parts = {course.parts}/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
