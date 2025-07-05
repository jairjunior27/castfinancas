import { UserType } from "@/src/types/user";
import { getCadastro } from "@/src/utils/userAsyncStorage";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getAll = async () => {
      const response = await getCadastro();
      setUser(response);
    };
    getAll();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
