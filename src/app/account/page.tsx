"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.user) {
      setForm({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || "",
        password: "",
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/user/update-details", {
      method: "PATCH",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;
    const res = await fetch("/api/user/delete", { method: "DELETE" });
    if (res.ok) {
      alert("Account deleted");
      await signOut()
      window.location.href = "/";
    } else {
      alert("Delete failed");
    }
  };

  if (!session?.user) return <p className="text-center mt-10">Not signed in</p>;

  return (
    <div className="max-w-xl mx-auto mt-30 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editing ? (
            <>
              <div>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="flex justify-between gap-4">
                <Button onClick={handleUpdate}>Save</Button>
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>First Name:</strong> {form.firstName}
              </p>
              {form.lastName && (
                <p>
                  <strong>Last Name:</strong> {form.lastName}
                </p>
              )}
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <Separator />
              <div className="flex justify-between gap-4">
                <Button onClick={() => setEditing(true)}>Edit</Button>
                <Button variant="default" onClick={handleDelete}>
                  Delete Account
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
