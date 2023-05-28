import backgroundImage from './assets/5301586.jpg'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { useAuthStore } from './store/usersStore';

import { Route, Routes, useSearchParams } from 'react-router-dom';
import Login from './components/Login.jsx';
import Users from './components/Users.jsx';
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import JupyterHubIframe from './components/JupyterHubIframe';
import FileBrowser from './components/FileBrowser.jsx';

import { useEffect, useState } from 'react';




function app(){

  const user = useAuthStore((state) => state.user);
  const erorr = useAuthStore((state) => state.error); 
  const handleToken = useAuthStore((state) => state.handleToken);


useState(async() => {

  await handleToken();
}, [handleToken]);

  
    return(
      <div 
      className='App'
      style={{ 
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        backgroundSize: 'cover',
        backgroundColor: '#000',
        filter: 'color(100%) brightness(100%)',

      }}>
        <Navbar />
      
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
          <Route path='/jupyterhub' element={<JupyterHubIframe />} />
          <Route path='/hdfs' element={<FileBrowser />} />
          
        
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
   
      </div>  

    
    )


}

export default app;