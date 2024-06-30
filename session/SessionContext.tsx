import { ReactNode, createContext, useContext, useMemo } from "react";

export type SessionType = {
  session: Record<string, any> | null;
  userData: Record<string, any> | null;
  loggedIn: boolean;
};

export type ProviderProps = {
  children: ReactNode;
};

export const SessionContext = createContext<SessionType | undefined>(undefined);

export const useSessionContext = (): SessionType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("no context");
  }
  return context;
};

export const SessionContextProvider = ({ children }: ProviderProps) => {
  const sessioinValue = useMemo(() => {
    return {
      session: null,
      userData: null,
      loggedIn: true,
    };
  }, []);
  return (
    <SessionContext.Provider value={sessioinValue}>
      {children}
    </SessionContext.Provider>
  );
};
