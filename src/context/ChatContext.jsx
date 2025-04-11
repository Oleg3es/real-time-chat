import { createContext, useState, useEffect } from 'react';
import usersData from '../data/users.json'

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // В реальном приложении здесь будет проверка авторизации
    if (users.length > 0) {
      setCurrentUser(users[0]); // Или другой логи выбора текущего пользователя
    }
  }, [users]);

  useEffect(() => {
    try {

      const formattedUsers = usersData.map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        userMessages: user.posts
      }))

      setUsers(formattedUsers)
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  return (
    <ChatContext.Provider
      value={{
        channels,
        setChannels,
        users,
        currentUser,
        setCurrentUser,
        isLoading
      }}>
      {children}
    </ChatContext.Provider>
  );
};