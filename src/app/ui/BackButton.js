import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="rounded-full border flex items-center gap-2 border-black mb-2 px-3 py-1 text-[14px]"
    >
      <FaArrowLeft />
      zurück
    </button>
  );
}
