import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../lib/UserContext";

export default function AuthCheck(props: any) {
  const { user } = useContext(UserContext);
  if (user) {
    return props.children;
  } else {
    return (
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 3rem)",
          backgroundColor: "var(--main)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <h1 style={{ color: "var(--black)" }}>You're not signed in!</h1>
        <Link href="/" style={{textDecoration: "none"}}>
          <p
            style={{
              backgroundColor: "var(--white)",
              padding: "1rem",
              borderRadius: "10px",
              fontSize: "1rem",
              color: "var(--black)",
            }}
          >
            Login
          </p>
        </Link>
      </div>
    );
  }
}
