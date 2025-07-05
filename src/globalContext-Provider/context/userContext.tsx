import { createContext } from "react";
import { UserType } from "../../types/user";

interface ContextUserType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const UserContext = createContext<ContextUserType | undefined>(undefined);
