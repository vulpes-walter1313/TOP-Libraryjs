import React from 'react'
import AuthCheck from '../components/AuthCheck'
import Bookshelf from '../components/Bookshelf';

export default function LibraryPage() {
  return (
    <AuthCheck>
      <Bookshelf />
    </AuthCheck>
  );
}
