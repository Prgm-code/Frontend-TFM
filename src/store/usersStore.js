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


export const useAuthStore = create((set) => ({
    token: null,
    user: null,
    error: null,
    
    handleToken: async () => {
      try {
        const token = localStorage.getItem('token');
       
  
        // Si el token no existe, terminamos la ejecución de la función
        if (!token) {
          
          console.log('token not found');
          return;
        }
  
        // Decodificamos el token y comprobamos errorees
        const decodedToken = jwtDecode(token)
        console.log(decodedToken);
        if (!decodedToken) {
            console.log('Invalid token');
           
            return  error;
        }

  
        // Comprobamos si el token ha expirado
        const currentTime = Date.now().valueOf() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log('token expired');
        
          return error;
        }
  
        // Si todo está bien, establecemos el token y el usuario en el estado
        set({ token, user: decodedToken.sub, error: null });
      } catch (error) {
        set({ error: 'Session expired' });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log('Session expired'); 

      }
    },
   
    login: async (user) => {
    
        console.log('useAuth',user);
        try {
          const response = await login(user);
            console.log(response);
       
          localStorage.setItem("token", response.token);
          const decodeUser = jwtDecode(response.token);
          console.log(decodeUser);
          set({ user: decodeUser.sub, token: response.token, error: null  });
          localStorage.setItem("user", JSON.stringify(decodeUser));
    
              
        } catch (error) {
          console.log(error);
          set({ error: error.message});
        }
    },  

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null, error: null });
    }
  }));