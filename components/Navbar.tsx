 import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useContext } from 'react';
import { auth } from '../lib/firebase';
import { UserContext } from '../lib/UserContext';
 import styles from "./Navbar.module.css";
 
 export default function Navbar() {
   const {user} = useContext(UserContext);

   return (
     <nav className={styles.navbarContainer}>
      <Link href="/">
        <p className={styles.title}>Library App</p>
      </Link>
      <ul className={styles.navlinks}>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/library">
          <li>Library</li>
        </Link>
        {user
          ? <li onClick={() => {
            console.log("Signing out: ", auth.currentUser?.displayName);
            signOut(auth)
          }}>Sign Out</li> : null}
      </ul>
     </nav>
   )
 }
 