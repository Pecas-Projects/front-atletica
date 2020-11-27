export const loginMembro = (token, userType, userId, atleticaId) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USER_TYPE', userType);
    localStorage.setItem('USER_ID', userId);
    localStorage.setItem('ATLETICA_ID', atleticaId);
}

export const loginAtletica = (token, userType, atleticaId) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USER_TYPE', userType);
    localStorage.setItem('ATLETICA_ID', atleticaId);
}

export const logout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('ATLETICA_ID');
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

export const getAtleticaId = () => {
    return localStorage.getItem('ATLETICA_ID')
}