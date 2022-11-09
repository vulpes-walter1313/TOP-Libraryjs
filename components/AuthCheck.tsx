import Link from 'next/link';
import React, { useContext } from 'react'
import { UserContext } from '../lib/UserContext'

export default function AuthCheck(props: any) {
  const { user } = useContext(UserContext);
  if (user) {
    return props.children;
  } else {
    return (
      <div>
        <h1>You're not signed in!</h1>
        <Link href="/">
          <p>Login</p>
        </Link>
      </div>
    )
  }
}
