import { Card, CardContent } from "@/components/ui/card";
import type { GeocodingResponse, WeatherData } from "@/types";
import { Image } from "@/components";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DropletsIcon,
  WindIcon,
} from "lucide-react";

type CurrentWeatherProps = {
  data: WeatherData;
  locationName?: GeocodingResponse;
};

export default function CurrentWeather({
  data,
  locationName,
}: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  function formatTemp(temp: number): string {
    return `${Math.round(temp)}°C`;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {locationName?.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Cảm giác như {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDownIcon className="size-3" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUpIcon className="size-3" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DropletsIcon className="size-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Độ ẩm</p>
                  <p className="text-muted-foreground text-sm">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <WindIcon className="size-4 text-green-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Tốc độ gió</p>
                  <p className="text-muted-foreground text-sm">{speed}m/s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <Image
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
