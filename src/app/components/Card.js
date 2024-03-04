import { fetchSheetData } from "../api/sheets";
import Image from "next/image";
export default async function Card() {
  const data = await fetchSheetData();
  return (
    <main>
      {data.slice(0, 10).map((item) => (
        <div key={item.name}>
          <Image
            src={`https:${item.image.replace(/\/\d+_\d+\//, "/860_860/")}`}
            width={500}
            height={500}
            className="w-[200px]"
            objectFit=""
            alt={item.name}
          />
          <p className="">{item.name}</p>
          <p>{item.originalPrice}</p>
          <p>{item.discountPrice}</p>
          <p>{item.updateDate}</p>
        </div>
      ))}{" "}
    </main>
  );
}
