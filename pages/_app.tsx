import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/UserContext";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  return (
    <UserContext.Provider value={{ user }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
