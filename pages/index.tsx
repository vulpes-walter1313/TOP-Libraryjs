import Head from 'next/head';
import Image from 'next/image'
import LoginForms from '../components/LoginForms';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className='homepage-main'>
      <Head>
        <title>Library App</title>
      </Head>
      <h1>Welcome To Your Digital Library Index</h1>
      <p>Log in to get started!</p>
      <LoginForms />
    </main>
  )
}
