"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeToggler";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Inside your Navbar component
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (status == "loading") return;
    if (!session?.user) {
      setDropdownOpen(false);
    }
  }, [status, session]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="w-full">
      <nav className="bg-background border-b border-border px-4 py-3 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/upcoming"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Upcoming
            </Link>
            <Link
              href="/past"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Past
            </Link>
            <Link
              href="/saved"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Saved
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 relative">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {!session?.user ? (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => signIn()}
                >
                  Login
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDropdown}
                    aria-label="User menu"
                    className="relative"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image!}
                        alt="Profile"
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                        priority
                      />
                    ) : (
                      <User className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>

                  {/* Animated Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 rounded-md shadow-md border border-border bg-card z-50"
                      >
                        <div
                          className="px-4 py-2 text-sm text-muted-foreground border-b border-border truncate max-w-full"
                          title={session.user.email ?? ""}
                        >
                          {session.user.email}
                        </div>
                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => {
                            setDropdownOpen(false);
                            signOut();
                          }}
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link
                href="/upcoming"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Upcoming
              </Link>
              <Link
                href="/past"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Past
              </Link>
              <Link
                href="/saved"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Saved
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-border">
                {!session?.user ? (
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => signIn()}
                  >
                    Login
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-1 text-sm px-2">
                    <span
                      className="text-muted-foreground px-2 py-1 truncate"
                      title={session.user.email ?? ""}
                    >
                      {session.user.email}
                    </span>
                    <Button
                      variant="ghost"
                      className="justify-start text-left px-2"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
