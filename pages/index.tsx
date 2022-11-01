import Head from "next/head";
import { useContext } from "react";
import LoginForms from "../components/LoginForms";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/UserContext";
import styles from "../styles/Home.module.css";
import { signOut } from "firebase/auth";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <main className={styles.homepageMain}>
      <Head>
        <title>Library App</title>
      </Head>
      <h1>Welcome To Your Library</h1>
      {user ? (
        <button
          onClick={() => {
            console.log("sign out", auth.currentUser?.displayName);
            signOut(auth);
          }}
        >
          Sign Out
        </button>
      ) : (
        <>
          <p>Login to keep track of your reading!</p>
          <LoginForms />
        </>
      )}
    </main>
  );
}
