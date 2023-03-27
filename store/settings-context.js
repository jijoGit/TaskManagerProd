import { createContext, useState } from 'react';

export const SettingContext = createContext([]);

function SettingsContextProvider({ children }) {
  const [pomodoroTime, setPomodoroTime] = useState('25');
  const [breakTime, setBreakTime] = useState('5');
  const value = { 
    pomodoroTime: pomodoroTime, 
    setPomodoroTime: setPomodoroTime, 
    breakTime: breakTime, 
    setBreakTime: setBreakTime 
  };

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
}

export default SettingsContextProvider;
