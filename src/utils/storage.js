export const loginMembro = (token, userType, userId, atleticaId, username) => {
  localStorage.setItem("TOKEN", token);
  localStorage.setItem("USER_TYPE", userType);
  localStorage.setItem("USER_ID", userId);
  localStorage.setItem("ATLETICA_ID", atleticaId);
  localStorage.setItem("ATLETICA_USERNAME", username);
  localStorage.setItem("ATLETICA_USERNAME_PESQUISADA", username);
};

export const loginAtletica = (token, userType, atleticaId, username) => {
  localStorage.setItem("TOKEN", token);
  localStorage.setItem("USER_TYPE", userType);
  localStorage.setItem("ATLETICA_ID", atleticaId);
  localStorage.setItem("ATLETICA_USERNAME", username);
  localStorage.setItem("ATLETICA_USERNAME_PESQUISADA", username);
};

export const logout = () => {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER_TYPE");
  localStorage.removeItem("USER_ID");
  localStorage.removeItem("ATLETICA_ID");
};

export const isLogin = () => {
  if (localStorage.getItem("TOKEN")) {
    return true;
  }
  return false;
};

export const atleticaUsernamePesquisada = (username) => {
  if (username) localStorage.setItem("ATLETICA_USERNAME_PESQUISADA", username);
  return localStorage.getItem("ATLETICA_USERNAME_PESQUISADA");
};

export const atleticaUsername = (username) => {
  if (username) localStorage.setItem("ATLETICA_USERNAME", username);
  return localStorage.getItem("ATLETICA_USERNAME");
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const getUserType = () => {
  return localStorage.getItem("USER_TYPE");
};

export const getUserId = () => {
  return localStorage.getItem("USER_ID");
};

export const getAtleticaId = () => {
  return localStorage.getItem("ATLETICA_ID");
};
