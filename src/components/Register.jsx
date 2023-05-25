import React, { useState } from "react";
import { Button, Form, Card } from "semantic-ui-react";
import { useRegisterUserStore } from "../store/usersStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

    const handleRedirect = () => {  
    navigate("/");
    }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario a la
    registerUser(formData);
  };
  const registerUser = useRegisterUserStore((state) => state.registerUser);
  const newUser = useRegisterUserStore((state) => state.newUser);


  return (newUser ? (
    <div className="card-container" style={{marginTop:  '2rem'}}>
        <Card>
        <h1>Usuario creado:</h1>
      <h2>{newUser.data.id}</h2>
      
        </Card>
        <Button
      onClick={handleRedirect}
      >Ir al login</Button>
    </div>
  ) : (
    <div className="card-container" style={{marginTop:  '2rem'}} >
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" name="email" onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Field>
        <Button 
        type="submit" 
        onClick={handleSubmit}
        >Register</Button>
      </Form>
    </div>
  ) )
};

export default Register;
