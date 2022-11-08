import React from 'react'
import AuthCheck from '../components/AuthCheck'

export default function LibraryPage() {
  return (
    <AuthCheck>
      <>
        <h1>Welcome to your library</h1>
        <div>LibraryPage</div>
      </>
    </AuthCheck>
  );
}
