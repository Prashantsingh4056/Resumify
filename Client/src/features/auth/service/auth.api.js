import api from "../../../config/api";

const register = async ({username, email, password}) => {

    try {

        const response = await api.post('/api/auth/register', {username, email, password});

        return response.data;
        
    } catch (error) {
        
        console.error(error);
        
    }
}

const login = async ({email, password}) => {

    try {

        const response = await api.post('/api/auth/login', {email, password});

        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}

const logout = async () => {
    
    try {

        const response = await api.get('/api/auth/logout');
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


const getMe = async () => {

    try {

        const response = await api.get('/api/auth/get-me');

        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}


export {
    register,
    login,
    logout,
    getMe
}
