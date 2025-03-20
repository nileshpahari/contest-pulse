"use client";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggler";
import Logo from "./Logo";
export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15 ">
          <Link href="/" className="relative group">
            <Logo />
          </Link>

          <div className="flex gap-10 items-center">
            <Link
              href="/upcoming"
              className="  text-muted-foreground font-medium   relative group"
            >
              Upcoming Contests
            </Link>
            <Link
              href="/saved"
              className="  text-muted-foreground font-medium   relative group"
            >
              Saved Contests
            </Link>
            <Link
              href="/account"
              className="  text-muted-foreground font-medium   relative group"
            >
              Account
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>

    // <nav className="">
    //   <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-4 px-20">
    //     <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
    //       <img
    //         src="https://flowbite.com/docs/images/logo.svg"
    //         className="h-8"
    //         alt="Flowbite Logo"
    //       />
    //       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Flowbite
    //       </span>
    //     </a>
    //     <button
    //       data-collapse-toggle="navbar-solid-bg"
    //       type="button"
    //       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  -500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark: -400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //       aria-controls="navbar-solid-bg"
    //       aria-expanded="false"
    //     >
    //       <span className="sr-only">Open main menu</span>
    //       <svg
    //         className="w-5 h-5"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 17 14"
    //       >
    //         <path
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M1 1h15M1 7h15M1 13h15"
    //         />
    //       </svg>
    //     </button>
    //     <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
    //       <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
    //             aria-current="page"
    //           >
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 px-3 md:p-0  -900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 px-3 md:p-0  -900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Pricing
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="block py-2 px-3 md:p-0  -900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}
