import api from "../services/api";

let userId;
let userType;

export function SetUserIdAndType(id, type) {
  userId = id;
  userType = type;
}

export const GetUserInfo = () => {
  let info = {
    userId,
    userType,
  };

  return info;
};

export const isLogin = () => {
  if (localStorage.getItem("@Olympos:token")) {
    return true;
  }
  return false;
};

const ApiService = {
  LoginAtletica: (crecencial) => {
    return api
      .post("/api/Login/Atletica", crecencial)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  LoginMembro: (credencial) => {
    return api
      .post("/api/Login/Membro", credencial)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },

  Logout: () => {
    localStorage.removeItem("@Olympos:token");
  },

  UploadImagem: (data, config) => {
    return api
      .post(`/api/Imagem/Upload`, data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  },

};

export default ApiService;
