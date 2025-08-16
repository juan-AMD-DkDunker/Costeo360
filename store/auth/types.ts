import { User } from "firebase/auth";

export interface Auth {
    user: User | null,
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}