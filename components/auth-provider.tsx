"use client";
import { auth } from "@/firebase/client";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  currentUser: User | null;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    if (!auth) return;
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
      }
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  function loginGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject();
        return;
      }
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((user) => {
          console.log("Signed in!");
          resolve();
        })
        .catch((e) => {
          console.error("Something went wrong in loginGoogle auth-provider", e);
          reject();
        });
    });
  }
  function logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!auth) {
        reject();
        return;
      }
      auth
        .signOut()
        .then(() => {
          console.log("Signed out");
          resolve();
        })
        .catch(() => {
          console.error("Something went wrong");
          reject();
        });
    });
  }
  return (
    <AuthContext.Provider value={{ currentUser, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
