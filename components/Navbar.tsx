 import Link from 'next/link';
import React from 'react';
 import styles from "./Navbar.module.css";
 
 export default function Navbar() {
   return (
     <nav className={styles.navbarContainer}>
      <Link href="/">
        <p className={styles.title}>Library App</p>
      </Link>
      <ul className={styles.navlinks}>
        <Link href="/library">
          <li>Library</li>
        </Link>
      </ul>
     </nav>
   )
 }
 