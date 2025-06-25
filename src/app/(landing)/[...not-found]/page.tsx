import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card/50 backdrop-blur-md p-6 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <Ghost className="h-10 w-10 text-orange-500 dark:text-orange-600" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          404 – Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Oops! Looks like the page you're looking for doesn’t exist.
        </p>

        <Button
          asChild
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </main>
  );
}
