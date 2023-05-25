import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import profilePic from '../assets/perfil.jpeg'; // Asegúrate de que la ruta a la imagen es correcta


const UserCard = ({ user }) => (
  <div className="">
    <Card>
      <Image src={profilePic} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
        <Card.Meta>
          <span className='date'>{user.id}</span>
        </Card.Meta>
        <Card.Description>
          {user.email}
        </Card.Description>
        <Card.Description>
          {user.timestamp}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
)

export default UserCard;
