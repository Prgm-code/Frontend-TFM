import { create } from "zustand";
import { getUsers, registerUser, login } from "../service/data-service";
import jwtDecode from "jwt-decode";


export const useUsersStore = create((set) => ({
  usersList: [],
  error: null,
  setUsersList: async () => {
   try { 
    const users = await getUsers();
    set({ usersList: users, error: null });
   } catch (error) {
         console.log(error);
         set({ error: 'Error cargando usuarios' });
    }
  },
}));

export const useRegisterUserStore = create((set) => ({
    error: null,
  newUser: null,
  registerUser: async (user) => {
    try {
    console.log(user);
    const newUser = await registerUser(user);
    set({ newUser: newUser, error: null });
    } catch (error) {
        console.log(error);
        set({ error: 'Error registrando usuario' });

    }

  },
}));

export const useAuthStore =  create((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,
  error: null,
  setToken: async (token) => {
    
    
    try {
      const response = await login(token);
        console.log(response);
   
      localStorage.setItem("token", response.token);
      const decodeUser = jwtDecode(response.token);
      console.log(decodeUser);
      set({ user: decodeUser.sub, token: response.token, error: null  });
      localStorage.setItem("user", JSON.stringify(decodeUser));

          
    } catch (error) {
      console.log(error);
      set({ error: 'not allowed'});
    }
  },
    logout: () => {
        console.log("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null , error: null});
    }

}));
