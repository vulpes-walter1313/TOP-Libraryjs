import React from 'react'

interface ErrorMessageProps {
  children: string;
}
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p style={{ 
        color: 'white', 
        backgroundColor: '#F04841',
        padding: '.5rem',
        margin: '.5rem 0',
        fontFamily: 'sans-serif'
      }}>{children}</p>
  )
}
