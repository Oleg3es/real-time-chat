import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';
import Container from '../components/Container';

const Message = () => {
  const { channels, users, currentUser } = useContext(ChatContext);
  const { id } = useParams();

  const channel = channels.find(channel => channel.id === id);

  if (!channel) {
    return <div>Канал не найден</div>;
  }

  const userMessages = channel.users[currentUser.id]?.posts || [];
  return (
    <Container>
      <div className='message'>
        <div className="message__group">
          <h1>{channel.name}</h1>
          <img src={channel.img.url} alt={channel.name} width={100} />
          {userMessages.map(message => (
            <div className="mess">
              {message.words[0]}
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Message