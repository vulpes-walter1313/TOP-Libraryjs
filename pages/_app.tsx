import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/UserContext";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
