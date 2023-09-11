import axios from 'axios';

export const login = async (user, dispatch) => {

    console.log('Login with dispatch triggred! ', user);

    try {
        const res = await axios.post('/auth/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = res.data;
        console.log('Data from apiCall: ', res)
        dispatch({ type: 'loggin_seccess', user: userData })
    } catch (err) {
        const errorData = err.response.data.msg;
        dispatch({ type: 'loggin_failure', error: errorData })
        console.log('Error from apiCall: ')
    }
}