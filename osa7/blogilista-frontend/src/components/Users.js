import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const User = ({ author, id, blogs }) => (
    <>
    <tr>
        <td><Link to = {`/users/${id}`}>{author}</Link></td>
        <td>{blogs}</td>
    </tr>
    </>
)

const Users = (props) => {
    console.log('in users and trying to show it')
    const users = []
    const usersBlogs = []
    const usersIds = []

    props.blogs.forEach(blog => {
        console.log(users.indexOf(blog.user.name))
        console.log(users)
        if (users.indexOf(blog.user.name) !== -1){
            console.log(`${blog.user.name} is already in users`)
            const index = users.indexOf(blog.user.name)
            usersBlogs[index] += 1
        } else {
            console.log(`${blog.user.name} not in list yet`)
            users.push(blog.user.name)
            usersBlogs.push(1)
            usersIds.push(blog.user.id)
        }
    })
    return (
        <div className = "users">
            <div className = "textContainer">
                <h3>Users</h3>
            </div>

            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><strong>blogs created</strong></td>
                    </tr>
                    {users.map((user,index) =>
                        <User
                            key = {user}
                            author = {user}
                            id = {usersIds[index]}
                            blogs = {usersBlogs[index]}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

export default connect(
    mapStateToProps,
    null
)(Users)