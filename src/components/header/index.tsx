"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-black h-20 shadow-xl">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className=" font-bold text-2xl pl-1 hover:tracking-widest duration-300 text-white">
            <span className="text-blue-600">Support</span>Hive
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#783c3a" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
