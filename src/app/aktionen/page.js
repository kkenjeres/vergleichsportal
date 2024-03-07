import Link from "next/link";
import { navCategories } from "../constants/index";
const MainPage = () => {
  return (
    <nav className="bg-white rounded-xl p-2 max-w-xs m-auto mt-10">
      <ul className="flex justify-around">
        {navCategories.map((link) => {
          return (
            <li key={link.route}>
              <Link href={`/aktionen/${link.path}`}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainPage;
