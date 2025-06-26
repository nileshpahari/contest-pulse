"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGoogle as Google } from "react-icons/fa";
import { FaGithub as Github } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function SignInClient() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
 
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-xl border border-border bg-card/50 backdrop-blur-md p-6 shadow-lg text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-foreground"
          >
            Sign in to Contest Pulse
          </motion.h1>

          <p className="text-muted-foreground text-sm mt-2">
            Track contests and set reminders seamlessly.
          </p>


          <div className="mt-6 flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              onClick={() => signIn("google", {callbackUrl:"/"})}
            >
              <Google className="h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              onClick={() => signIn("github", {callbackUrl:"/"})}
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            By signing in, you agree to our terms and privacy policy.
          </p>
        </motion.div>
    </main>
  );
}