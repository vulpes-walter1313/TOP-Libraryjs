import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useForm} from "react-hook-form";
import { auth } from '../lib/firebase';
import ErrorMessage from './ErrorMessage';
import type { LoginFormInput } from './LoginForms';
import styles from "./LoginForms.module.css";
import toast from 'react-hot-toast';


export default function RegisterAccount() {
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>();
  const [createUserError, setCreateUserError] = useState("");
  async function submitData(data: LoginFormInput) {
    try {
      let result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (result) {
        toast.success("User created Successfully");
        router.push("/library");
      }       
    }
    catch(e: any) {
      toast.error(`There was an error: ${e.message}`);
      if (e) {
        setCreateUserError(e.message);
      }
    }
  }
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
      {createUserError ? <p>{createUserError}</p> : null}
      <input className={styles.submitBtn} type="submit"/>
    </form>
  )
}
