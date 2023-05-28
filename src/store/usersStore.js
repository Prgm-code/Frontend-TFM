import { create } from "zustand";
import { getUsers, registerUserApi, login } from "../service/data-service";
import jwtDecode from "jwt-decode";

export const useUsersStore = create((set) => ({
  usersList: [],
  error: null,
  setUsersList: async () => {
    try {
      const {data} = await getUsers();
      set({ usersList: data, error: null });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },
}));

export const useRegisterUserStore = create((set) => ({
  error: null,
  newUser: null,
  registerUser: async (user) => {
    try {
      console.log(user);
      const {data} = await registerUserApi(user);
      console.log(data.data);
      set({ newUser: data.data.id, error: null });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {  // Comprobación de que error.response y error.response.data existen
        set({ newUser: null, error: error.response.data.message || error.message });  // Si error.response.data.message no existe, utilizar error.message
      } else {
        set({ newUser: null, error: error.message });
      }
    }
  },
}));

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  error: null,

  handleToken: async () => {
    try {
      const token = localStorage.getItem("token");

      // Si el token no existe, terminamos la ejecución de la función
      if (!token) {
        console.log("token not found");
        return;
      }

      // Decodificamos el token y comprobamos errorees
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      if (!decodedToken) {
        console.log("Invalid token");

        return error;
      }

      // Comprobamos si el token ha expirado
      const currentTime = Date.now().valueOf() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("token expired");
        set({ error: "Session expired" });
        return error;
      }

      // Si todo está bien, establecemos el token y el usuario en el estado
      set({ token, user: decodedToken.sub, error: null });
    } catch (error) {
      set({ error: "Session expired" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Session expired");
    }
  },

  login: async (user) => {
    try {
      const {data} = await login(user);
      console.log(data);

      localStorage.setItem("token", data.token);
      const decodeUser = jwtDecode(data.token);
      console.log(decodeUser);
      set({ user: decodeUser.sub, token: data.token, error: null });
      localStorage.setItem("user", JSON.stringify(decodeUser));
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, error: null });
  },
}));
