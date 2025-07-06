import { createContext } from "react";
import { UserType } from "../../types/user";

interface ContextUserType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isModal: boolean;
  setIsModal: (modal: boolean) => void;
}

export const UserContext = createContext<ContextUserType | undefined>(
  undefined
);
