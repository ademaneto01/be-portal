'use client';

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

interface ContextProps {
  isLoadingLogOut: boolean;
  setIsLoadingLogOut: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({
  isLoadingLogOut: false,
  setIsLoadingLogOut: () => {},
});

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoadingLogOut, setIsLoadingLogOut] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
       
        isLoadingLogOut,
        setIsLoadingLogOut,
       
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
