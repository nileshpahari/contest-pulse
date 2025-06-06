import { getServerSession } from "next-auth"
import { NavbarClient } from "./ui/NavbarClient"
export async function Navbar() {
  const session = await getServerSession()
  const navItems = [
    {
      name: "Upcoming",
      path: "/upcoming",
      active: true,
    },
    {
      name: "Past",
      path: "/past",
      active: true,
    },
    {
      name: "Saved",
      path: "/saved",
      active: true,
    },
    // {
    //   name: "Account",
    //   path: "/account",
    //   active: !!session,
    // },
    // {
    //   name: "Login",
    //   path: "/api/auth/signin",
    //   active: !session,
    // },
  ]

  return <NavbarClient navItems={navItems} />
}
