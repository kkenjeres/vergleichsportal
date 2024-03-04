import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="rounded-full border flex items-center gap-2 border-black absolute top-10 px-3 py-1"
    >
      <FaArrowLeft />
      Back
    </button>
  );
}
