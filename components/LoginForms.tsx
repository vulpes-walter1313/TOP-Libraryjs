import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleAuthProvider } from "../lib/firebase";

export default function LoginForms() {
  async function signInWithGoogle() {
    await signInWithPopup(auth, googleAuthProvider);
  }

  return (
    <div>
      <h2>Login to Continue</h2>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <form></form>
    </div>
  );
}
