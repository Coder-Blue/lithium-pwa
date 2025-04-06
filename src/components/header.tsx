import { Link } from "@tanstack/react-router";
import { CitySearch, Image, ThemeToggle, useTheme } from "@/components";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b py-2 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Image
            src={
              theme === "dark"
                ? "/assets/logo-dark.webp"
                : "/assets/logo-light.webp"
            }
            alt="LithiumLogo"
            className="h-15"
          />
        </Link>

        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
