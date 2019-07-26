import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = ( state = '', action ) => {
    console.log(action.type)
    console.log(`LogiReducer state: ${state}`)
    switch (action.type) {
    case 'LOG_IN':
        console.log(`loginReducer action data: ${action.data}`)
        return action.data
    case 'LOG_OUT':
        return ''
    default:
        return state
    }
}

/*const user = await loginService.login({
                username: username.value,
                password: password.value
            })*/

export const logIn = ( username, password ) => {
    return async dispatch => {
        const currentUser = await loginService.login({
            username: username,
            password: password
        })
        blogService.setToken(currentUser.token)
        dispatch({
            type: 'LOG_IN',
            data: currentUser,
        })
    }
}

export const logOut = () => {
    console.log('wanted to logout')
    return async dispatch => {
        dispatch({
            type: 'LOG_OUT',
            data: [],
        })
    }
}




export default loginReducer

/*
useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
}, [])*/