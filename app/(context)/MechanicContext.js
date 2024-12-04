// app/context/MechanicContext.js
import React, { createContext, useState } from 'react';

export const MechanicContext = createContext();

const MechanicProvider = ({ children }) => {
  const [mechanics, setMechanics] = useState([]); // Shared mechanic list

  const addMechanic = (mechanic) => {
    setMechanics((prev) => {
      // Prevent duplicate entries by checking `id`
      if (!prev.some((m) => m.id === mechanic.id)) {
        return [...prev, mechanic];
      }
      return prev;
    });
  };

  return (
    <MechanicContext.Provider value={{ mechanics, addMechanic }}>
      {children}
    </MechanicContext.Provider>
  );
};

export default MechanicProvider;
