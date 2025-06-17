"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function SignUp() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [session, router, status]);
  if (status == "authenticated") return null;
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const msg = await res.json();
      setError(msg || "Something went wrong");
      setLoading(false);
      return;
    }

    const loginRes = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (loginRes?.ok) {
      router.push("/");
    } else {
      setError("Signup succeeded but login failed");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4 text-black"
      >
        <h1 className="text-xl font-semibold">Sign Up</h1>

        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
