import Image from "next/image";
import CardsList from "./components/CardsList";
export default async function Home() {
  return (
    <main>
      <CardsList />
    </main>
  );
}
