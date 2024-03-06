import Link from "next/link";
const Nav = () => {
  return (
    <nav className="bg-white rounded-xl p-2 max-w-xs m-auto mt-10">
      <ul className="flex  justify-around">
        <Link href="/">
          <li className="hover:underline">Home</li>
        </Link>
        <Link href={`/aktionen`}>
          <li className="hover:underline">Aktionen</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
