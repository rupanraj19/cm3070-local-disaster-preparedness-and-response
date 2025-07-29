import React from 'react';
import MainStack from './navigation/MainStack';
import { UserProvider } from './context/UserContext'; // usercontext
import { ThemeProvider } from './context/ThemeContext'; // themecontext

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <MainStack />
      </ThemeProvider>
    </UserProvider>
  );
}
