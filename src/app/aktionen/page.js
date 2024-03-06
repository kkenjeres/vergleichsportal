import Link from "next/link";

const MainPage = () => {
  const links = [
    { path: "bier", name: "Bier" },
    { path: "test", name: "Test" },
  ];

  return (
    <nav className=" p-4 w-full">
      <ul className="flex justify-center gap-4">
        {links.map(({ path, name }) => (
          <li key={path} className="list-none">
            <Link
              href={`/aktionen/${path}`}
              className="text-black hover:underline"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainPage;
