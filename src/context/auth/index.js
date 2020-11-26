import React, { createContext, useState } from "react";
import ApiService from "../../variables/ApiService";
import api from "../../services/api";

const AuthContext = createContext({
  userInfo: {},
  userType: " ",
});

export function AuthProvider({ children }) {

  const [userInfo, setUserInfo] = useState();
  const [userType, setUserType] = useState("");

  async function LoginAtletica(loginData) {
    await ApiService.LoginAtletica(loginData)
      .then(async (res) => {
        setUserInfo(res.data.atletica);
        setUserType("A");
        // api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
        localStorage.setItem("@Olympos:token", res.data.token);


        // ===================================
        // RETIRE ISSO CASO O CONTEXT FUNCIONE
        localStorage.setItem("@Olympos:userInfo", res.data.atletica)
        localStorage.setItem("@Olympos:userType", 'A')
        // ===================================


      })
      .catch((res) => console.log(res));
  }

  async function LoginMembro(loginData) {
    await ApiService.LoginMembro(loginData)
      .then((res) => {
        setUserInfo(res.data.atletica);
        setUserType("M");
        // api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
        localStorage.setItem("@Olympos:token", res.data.token);

        // ===================================
        // RETIRE ISSO CASO O CONTEXT FUNCIONE
        localStorage.setItem("@Olympos:userInfo", res.data.atletica)
        localStorage.setItem("@Olympos:userType", 'M')
        // ===================================


      })
      .catch((res) => console.log(res));
  }

  return (
    <AuthContext.Provider
      value={{ LoginMembro, LoginAtletica, userInfo, userType }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   return context;
// };

// export default useAuth;
