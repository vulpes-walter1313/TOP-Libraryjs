import { useRouter } from 'next/router';
import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {useForm} from "react-hook-form";
import { auth } from '../lib/firebase';
import ErrorMessage from './ErrorMessage';
import type { LoginFormInput } from './LoginForms';
import styles from "./LoginForms.module.css";


export default function RegisterAccount() {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>();
  async function submitData(data: LoginFormInput) {
    await createUserWithEmailAndPassword(data.email, data.password);
    router.push("/library");
  }
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
return (
    <form onSubmit={handleSubmit(submitData)} className={styles.form}>
      <p className={styles.title}>Create an Account:</p>
      <div className={styles.formItem}>
        <label htmlFor="email">Email:</label>
        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} id="email"/>
        {errors.email?.type === "required" && <ErrorMessage>Please provide an email!</ErrorMessage>}
        {errors.email?.type === "pattern" && <ErrorMessage>Please provide a valid password!</ErrorMessage>}
      </div>
      <div className={styles.formItem}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password", {minLength: 3, maxLength: 25 })}/>
        {errors.password?.type === "minLength" && <ErrorMessage>The password is too small</ErrorMessage>}
        {errors.password?.type === "maxLength" && <ErrorMessage>The password is too long</ErrorMessage>}
      </div>
      <input className={styles.submitBtn} type="submit"/>
    </form>
  )
}
