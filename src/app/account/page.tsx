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
  // const [editing, setEditing] = useState(false);
  // const [form, setForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });

 if(session){
 return <div className="flex flex-col items-center justify-center h-screen w-screen">
  <h1 className="text-3xl font-bold">Account</h1>
  <div>
    <p className="text-lg">{session.user?.email}</p>
    <p className="text-lg">{session.user?.name}</p>
    </div>
  <Button onClick={() => signOut()}>Logout</Button>
 </div>
 }else{
  return <div className="flex items-center justify-center h-screen">Not signed in</div>
 }; 
}