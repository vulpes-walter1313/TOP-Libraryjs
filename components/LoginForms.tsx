import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleAuthProvider } from "../lib/firebase";
import ErrorMessage from "./ErrorMessage";
import styles from "./LoginForms.module.css";
import RegisterAccount from "./RegisterAccount";

 export interface LoginFormInput {
  email: string;
  password: string;
}
export default function LoginForms() {
  const {register, handleSubmit, formState: { errors }} = useForm<LoginFormInput>();
  const router = useRouter();

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleAuthProvider);
    router.push("/library")
  }
  function submitData(data: LoginFormInput) {
    console.log(data);
  }
  return (
    <div className={styles.mainContainer}>
      <button className={styles.googleBtn} onClick={signInWithGoogle}>
        <img  src="/google.png" style={{width: '40px', height: '40px'}}/>
        Login with Google</button>
      <form className={styles.form} onSubmit={handleSubmit(submitData)}>
        <p className={styles.title}>Log in with Email and Password</p>
        <div className={styles.formItem}>
          <label htmlFor="email">Email:</label>
          <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} id="email"/>
          {errors.email?.type === "required" && <ErrorMessage>Email is required!</ErrorMessage>}
          {errors.email?.type === "pattern" && <ErrorMessage>Provide a valid email</ErrorMessage>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password", {minLength: 3, maxLength: 25 })}/>
          {errors.password?.type === "minLength" && <ErrorMessage>The password is too small</ErrorMessage>}
          {errors.password?.type === "maxLength" && <ErrorMessage>The password is too long</ErrorMessage>}
        </div>
        <input className={styles.submitBtn} type="submit"/>
      </form>
      <RegisterAccount />
    </div>
  );
}
