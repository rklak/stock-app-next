"use client";
import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

// Get firebase config from firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBLYkBzXMHnSdwGozisN1e7hBvWZBfCxmo",
  authDomain: "myclipo-project.firebaseapp.com",
  projectId: "myclipo-project",
  storageBucket: "myclipo-project.appspot.com",
  messagingSenderId: "32064707608",
  appId: "1:32064707608:web:b9a88eb482159c04a3776d",
};

const currentApps = getApps();

let auth: Auth | undefined = undefined;

if (currentApps.length <= 0) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  if (
    process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
    process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
  ) {
    connectAuthEmulator(
      auth,
      `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`,
    );
  }
} else {
  auth = getAuth(currentApps[0]);
  if (
    process.env.NEXT_PUBLIC_APP_ENV === "emulator" &&
    process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH
  ) {
    connectAuthEmulator(
      auth,
      `http://${process.env.NEXT_PUBLIC_EMULATOR_AUTH_PATH}`,
    );
  }
}

export { auth };
