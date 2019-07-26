const notificationReducer = (state = '', action ) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
        console.log('notification was set')
        return action.message
    default:
        return state
    }
}
export const showNotification = ( message, time ) => {
    console.log(time)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                message: '',
            })
        }, time*1000)
    }

    /*
    return {
        type: 'SET_NOTIFICATION',
        message,
    }*/
}


export default notificationReducer