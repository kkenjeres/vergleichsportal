import React from "react";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className="bg-white rounded-xl p-2 max-w-xs m-auto mt-10">
      <ul className="flex  justify-around">
        <Link href="/">
          <li className="hover:underline">Home</li>
        </Link>
        <Link href={`/aktionnen/?category=bier`}>
          <li className="hover:underline">Aktionnen</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
