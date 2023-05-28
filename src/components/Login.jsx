import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useAuthStore } from '../store/usersStore'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const error = useAuthStore((state) => state.error);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario a la API
    await login(formData);

    console.log(formData);

  };
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/users');
  };

  useEffect(() => { 
    console.log(user);
    if (user) {

      handleRedirect();
    }
  }, [user]);



  return (

    <div className='card-container' style={{marginTop:  '2rem'}}>
          <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Email</label>
        <input
          placeholder='User Id'
          name='userId'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
      </Form.Field>
      <Button type='submit'>Login</Button>
    </Form>
    </div>

  );
};

export default Login;
