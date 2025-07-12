import React from 'react';
import MainStack from './navigation/MainStack';
import { UserProvider } from './context/UserContext'; // adjust path

export default function App() {
  return (
    <UserProvider>
      <MainStack />
    </UserProvider>
  );
}
