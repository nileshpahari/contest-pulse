"use client";
import { useRouter } from "next/navigation";
import UnderConstruction from "@/components/UnderConstruction";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/upcoming");
  }, [router]);
  return <UnderConstruction />;
}
