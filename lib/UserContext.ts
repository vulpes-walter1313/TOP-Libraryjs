import { User } from "firebase/auth";
import { createContext } from "react";

type UserContextValueType = {
  user: User | null | undefined;
};

export const UserContext = createContext<UserContextValueType>({ user: null });
