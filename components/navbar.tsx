"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const auth = useAuth();
  const router = useRouter();
  const loginGoogle = () => {
    auth
      ?.loginGoogle()
      .then(() => {
        console.log("Logged in!");
      })
      .catch(() => {
        console.error("Something went wrong");
      });
  };

  const logout = () => {
    auth
      ?.logout()
      .then(() => {
        console.log("Logged out!");
        router.push("/logout");
      })
      .catch(() => {
        console.error("Something went wrong");
      });
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Stocks app</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"} className="">
              Homepage
            </Link>
          </li>
          {auth?.currentUser && (
            <li>
              <Link href={"stocks"} className="">
                Stocks
              </Link>
            </li>
          )}
          {!auth?.currentUser && (
            <li>
              <button onClick={loginGoogle}>Sign in with Google</button>
            </li>
          )}
          {auth?.currentUser && (
            <li>
              <button className="" onClick={logout}>
                Logout
              </button>
            </li>
          )}
          {auth?.currentUser && (
            <li>
              <p>{auth.currentUser.displayName}</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
