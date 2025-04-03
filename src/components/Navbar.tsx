"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggler";
import Logo from "./Logo";
import { getServerSession } from "next-auth";
export async function Navbar() {
  const session = await getServerSession();
  const navItems = [
    {
      name: "Upcoming Contests",
      path: "/upcoming",
      active: true,
    },
    {
      name: "Saved Contests",
      path: "/saved",
      active: true,
    },
    {
      name: "Account",
      path: "/account",
      active: session,
    },
    {
      name: "Login",
      path: "/api/auth/signin",
      active: !session,
    },
  ];
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15 ">
          <Link href="/" className="relative group">
            <Logo />
          </Link>

          <div className="flex gap-10 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <Link
                    href={item.path}
                    className="  text-muted-foreground font-medium   relative group"
                  >
                    {item.name}
                  </Link>
                )
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
