import axios from 'axios';

export const login = async (user, dispatch) => {

    console.log('Login with dispatch triggred! ', user);

    try {
        const res = await axios.post('/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = res.data
        console.log('Data from apiCall: ', res)
        dispatch({ type: 'loggin_seccess', user: userData })
    } catch (err) {
        dispatch({ type: 'loggin_failure' })
        console.log('Error from apiCall: ', err)
    }
}