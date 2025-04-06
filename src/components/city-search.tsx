import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { useFavorite, useLocationSearch, useSearchHistory } from "@/hooks";
import { vi } from "date-fns/locale";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  Loader2Icon,
  SearchIcon,
  StarIcon,
  XCircleIcon,
} from "lucide-react";

export default function CitySearch() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { favorites } = useFavorite();
  const { history, clearHistory, addToHistory } = useSearchHistory();

  function handleSelect(cityData: string) {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate({
      to: "/city/$cityName",
      params: { cityName: name },
      search: { lat: parseFloat(lat), lon: parseFloat(lon) },
    });
  }

  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => setOpen(true)}
        className="text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
      >
        <SearchIcon className="mr-2 size-4" />
        Tìm kiếm thành phố...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Tìm kiếm thành phố..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>Không tìm thấy thành phố.</CommandEmpty>
            )}

            {favorites.length > 0 && (
              <CommandGroup heading="Yêu thích">
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                  >
                    <StarIcon className="mr-2 size-4 text-yellow-500" />
                    <span>{city.name}</span>
                    {city.state && (
                      <span className="text-muted-foreground text-sm">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="my-2 flex items-center justify-between px-2">
                    <p className="text-muted-foreground text-xs">
                      Tìm kiếm gần đây
                    </p>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => clearHistory.mutate()}
                    >
                      <XCircleIcon className="size-4" />
                      Xóa
                    </Button>
                  </div>
                  {history.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <ClockIcon className="text-muted-foreground mr-2 size-4" />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-muted-foreground text-sm">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-muted-foreground text-sm">
                        , {item.country}
                      </span>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {format(item.searchedAt, "d MMM, h:mm a", {
                          locale: vi,
                        })}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />

            {locations && locations.length > 0 && (
              <CommandGroup heading="Gợi ý">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2Icon className="size-4 animate-spin" />
                  </div>
                )}
                {locations.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <SearchIcon className="mr-2 size-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-muted-foreground text-sm">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
