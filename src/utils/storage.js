export const login = (token, userType, userId) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USER_TYPE', userType);
    localStorage.setItem('USER_ID', userId);
}

export const logout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('USER_ID');
}

export const isLogin = () => {
    if (localStorage.getItem('TOKEN')) {
        return true;
    }
    return false;
}

export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const getUserType = () => {
    return localStorage.getItem('USER_TYPE')
}

export const getUserId = () => {
    return localStorage.getItem('USER_ID')
}