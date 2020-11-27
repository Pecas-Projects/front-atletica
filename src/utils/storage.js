export const login = (token, userType, userId, username) => {
  localStorage.setItem("TOKEN", token);
  localStorage.setItem("USER_TYPE", userType);
  localStorage.setItem("USER_ID", userId);
  if (userType === "A") {
    localStorage.setItem("USERNAME", username);
  }
};

export const logout = () => {
  if (localStorage.getItem("USER_TYPE") === "A") {
    localStorage.removeItem("USERNAME");
  }
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER_TYPE");
  localStorage.removeItem("USER_ID");
};

export const isLogin = () => {
  if (localStorage.getItem("TOKEN")) {
    return true;
  }
  return false;
};

export const atleticaUsername = (username) => {
    if (username)
        localStorage.setItem('ATLETICA_USERNAME', username);
    return localStorage.getItem('ATLETICA_USERNAME')
}

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const getUserType = () => {
  return localStorage.getItem("USER_TYPE");
};

export const getUserId = () => {
  return localStorage.getItem("USER_ID");
};

export const getUsername = () => {
  return localStorage.getItem("USERNAME");
};
