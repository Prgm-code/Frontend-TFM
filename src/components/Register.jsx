import React, { useEffect, useState } from "react";
import { Button, Form, Card, Message } from "semantic-ui-react";
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
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); // Agregado para manejar errores de conexión

  const handleRedirect = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const registerUser = useRegisterUserStore((state) => state.registerUser);
  const error = useRegisterUserStore((state) => state.error);
  const newUser = useRegisterUserStore((state) => state.newUser);
  const [showMessage, setShowMessage] = useState(null);
  const [showNewUser, setShowNewUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await registerUser(formData);
        console.log(res);
        setShowMessage(true);
       
      } catch (err) {
        console.error(err);
        if (err.response) {
          // La solicitud fue realizada y el servidor respondió con un código
          // de estado que cae fuera del rango de 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setErrorMessage(err.response.data.message || `Error ${err.response.status}: ${err.response.data.error}`);
        } else if (err.request) {
          // La solicitud fue realizada pero no se recibió ninguna respuesta
          console.log(err.request);
          setErrorMessage('Request made but no response received');
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un Error
          console.log('Error', err.message);
          setErrorMessage(err.message);
        }
      }
    }
  };

  useEffect(() => {
    if (newUser) {
      setShowNewUser(true);
    }
  }, [newUser]);

  useEffect(() => {
    if (error) {
      setShowMessage(true);
    }
  }, [error]);

  useEffect(() => {
    if (showNewUser != null) {
      setTimeout(() => {
        handleRedirect();
      }, 7000);
    }
  }, [showNewUser]);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Check if all fields are filled
    for (let field in formData) {
      if (!formData[field]) {
        isValid = false;
        errors[field] = `${field} is required.`;
      }
    }

    // validaciones
    if (formData.firstName.includes(" ")) {
      isValid = false;
      errors.firstName = "First name should not contain spaces.";
    }

    if (formData.lastName.includes(" ")) {
      isValid = false;
      errors.lastName = "Last name should not contain spaces.";
    }

    if (formData.email.includes(" ")) {
      isValid = false;
      errors.email = "Email should not contain spaces.";
    }

    setFormErrors(errors);
    return isValid;
  };


  return (
    <>
     {showMessage && (
        <Message
          onDismiss={() => setShowMessage(false)}
          positive={newUser != null}
          negative={error != null || errorMessage != null} // Modificado para manejar errores de conexión
          header={
            showNewUser != null
              ? `Usuario creado: ${newUser}`
              : `Error: ${error || errorMessage}` // Modificado para manejar errores de conexión
          }
          list={Object.values(formErrors).concat(error ? [error] : []).concat(errorMessage ? [errorMessage] : [])} // Modificado para manejar errores de conexión
        />
      )}
      {showNewUser ? (
        <div className="card-container" style={{ marginTop: "2rem" }}>
          <Card>
            <h1>Usuario creado:</h1>
            <h2>{newUser}</h2>
          </Card>
          <Button onClick={handleRedirect}>Ir al login</Button>
        </div>
      ) : (
        <div className="card-container" style={{ marginTop: "2rem" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Field error={formErrors.firstName ? true : false}>
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              />
              {formErrors.firstName && <span>{formErrors.firstName}</span>}
            </Form.Field>
            <Form.Field error={formErrors.lastName ? true : false}>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
              {formErrors.lastName && <span>{formErrors.lastName}</span>}
            </Form.Field>
            <Form.Field error={formErrors.email ? true : false}>
              <label>Email</label>
              <input placeholder="Email" name="email" onChange={handleChange} />
              {formErrors.email && <span>{formErrors.email}</span>}
            </Form.Field>
            <Form.Field error={formErrors.password ? true : false}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              {formErrors.password && <span>{formErrors.password}</span>}
            </Form.Field>
            <Button type="submit">Register</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Register;
