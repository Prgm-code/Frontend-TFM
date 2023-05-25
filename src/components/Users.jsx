import React, { useEffect } from 'react';
import { useUsersStore,useAuthStore } from '../store/usersStore'; // Asegúrate de importar el hook de tu tienda
import UserCard from './UserCard';

 function Users () {
  const usersList = useUsersStore(state => state.usersList);
  const setUsersList = useUsersStore(state => state.setUsersList);
  const setToken = useAuthStore(state => state.setToken);
  const user = useAuthStore((state) => state.user);
  const error = useAuthStore((state) => state.error);



  const handleUsers = async () => {

  await setUsersList();
}
  useEffect(() => {
handleUsers();
  }, []);
 
  

  return (
    user ? (
      <div className='card-container'>
      {usersList.map(user => (
        <UserCard key={user.id} user={user} />
        
      ))}
    </div>
      
    ) : (
      <div className='card-container' style={{marginTop:  '2rem'}}>
        <h1>Forbidden</h1>
      </div>
    )
    
  );
}

export default Users;
