import { useTheme } from "@/components";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex cursor-pointer items-center transition-transform duration-500",
        isDark ? "rotate-180" : "rotate-0",
      )}
    >
      {isDark ? (
        <SunIcon className="size-6 rotate-0 text-yellow-500 transition-all" />
      ) : (
        <MoonIcon className="size-6 rotate-0 text-blue-500 transition-all" />
      )}
      <span className="sr-only">Đổi chế độ</span>
    </div>
  );
}
