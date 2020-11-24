import React, { createContext, useState, useEffect } from "react";

import ApiService, { SetUserId } from "../../variables/ApiService";
import api from "../../services/api";

const AuthContext = createContext({ signed: null, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function loadStoragedData() {
      const storagedToken = localStorage.getItem("@Olympos:token");

      if (storagedToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

        ApiService.GetUserData()
          .then((response) => {
            console.log(response.data);
            // SetUserId(response.data.company.id);
            // setUser(response.data);
            // setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            //setLoading(false);
          });
      }
    }
    loadStoragedData();
  }, []);

  async function Login(data) {
    return await ApiService.LoginAtletica(data)
      .then((res) => {
        console.log(res.data);
        // setUser(res.data);
        // SetUserId(res.data.company.id);
        // api.defaults.headers[
        //     'Authorization'
        // ] = `Bearer ${res.data.Login.token}`;

        //localStorage.setItem("@Olympos:token", res.data.Login.token);
      })
      .catch((error) => {
        console.log(error);
        //setLoading(false);
        //return Promise.reject(error);
      });
  }

  function Logout() {
    //const refreshToken = localStorage.getItem('@Olympos:refreshToken');
    // return ApiService.Logout(refreshToken)
    //     .then((res) => {
    //         // console.log(res);
    //         localStorage.clear();
    //         api.defaults.headers['Authorization'] = null;
    //         // localStorage.removeItem('@SeuZe:refreshToken');
    //         // localStorage.removeItem('@SeuZe:token');
    //         // localStorage.removeItem('@SeuZe:user');
    //         setUser(null);
    //     })
    //     .catch((error) => {
    //         // console.log(error);
    //         return Promise.reject(error);
    //     });
  }
};

export default AuthProvider;
