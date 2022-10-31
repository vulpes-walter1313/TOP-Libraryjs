import React from 'react';
import {useForm} from "react-hook-form";
import ErrorMessage from './ErrorMessage';
import type { LoginFormInput } from './LoginForms';
import styles from "./LoginForms.module.css";


export default function RegisterAccount() {
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>();
  function submitData(data: LoginFormInput) {
    console.log(data);
  }
return (
    <form onSubmit={handleSubmit(submitData)}>
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
        {errors.password?.type === "minLength" && <p className={styles.error}>The password is too small</p>}
        {errors.password?.type === "maxLength" && <p className={styles.error}>The password is too long</p>}
      </div>
      <input type="submit"/>
    </form>
  )
}
