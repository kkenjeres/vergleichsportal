"use client";
import Link from "next/link";
import { navLinks } from "../constants/index";
import { usePathname } from "next/navigation";
const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-white rounded-xl p-2 max-w-xs m-auto mt-10">
      <ul className="flex  justify-around">
        {navLinks.map((link) => {
          const isActive = link.route === pathname;
          return (
            <li
              key={link.route}
              className={`${isActive ? "underline " : "text-gray-700"}`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
