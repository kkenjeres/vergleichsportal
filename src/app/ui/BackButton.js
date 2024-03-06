import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
export default function BackButton() {
  const router = useRouter();

  const goBackOrHome = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/"); // Перенаправление на главную страницу, если назад перейти нельзя
    }
  };

  return (
    <button
      onClick={goBackOrHome}
      className="rounded-full border flex items-center gap-2 border-black fixed z-10 top-10 px-3 py-1"
    >
      <FaArrowLeft />
      zurück
    </button>
  );
}
