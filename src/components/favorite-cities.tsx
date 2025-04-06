import { useNavigate } from "@tanstack/react-router";
import { useFavorite, useWeatherQuery } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Image } from "@/components";
import { Loader2Icon, XIcon } from "lucide-react";

type FavoriteCityTabletProps = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  function handleClick() {
    navigate({
      to: "/city/$cityName",
      params: { cityName: name },
      search: { lat, lon },
    });
  }

  return (
    <div
      onClick={handleClick}
      className="bg-card relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border p-4 pr-8 shadow-sm transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="hover:text-destructive-foreground absolute top-1 right-1 size-6 rounded-full p-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Đã xóa ${name} khỏi Yêu thích`);
        }}
      >
        <XIcon className="size-4" />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="size-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-muted-foreground text-xs">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function FavoriteCities() {
  const { favorites, deleteFavorite } = useFavorite();

  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Mục Yêu thích</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => deleteFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}
