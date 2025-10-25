import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-9 invert opacity-80" />
      </Link>

      {/* ✅ Shows proper button depending on sign-in state */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="border px-3 py-1 rounded-md">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Navbar;
