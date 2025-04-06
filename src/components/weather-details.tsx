import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { WeatherData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CompassIcon, GaugeIcon, SunriseIcon, SunsetIcon } from "lucide-react";

type WeatherDetailsProps = {
  data: WeatherData;
};

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  function formatTime(timestamp: number): string {
    return format(new Date(timestamp * 1000), "h:mm a", { locale: vi });
  }

  function getWindDirection(degree: number): string {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

    return directions[index];
  }

  const details = [
    {
      title: "Bình minh",
      value: formatTime(sys.sunrise),
      icon: SunriseIcon,
      color: "text-orange-500",
    },
    {
      title: "Hoàng hôn",
      value: formatTime(sys.sunset),
      icon: SunsetIcon,
      color: "text-blue-500",
    },
    {
      title: "Hướng gió",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: CompassIcon,
      color: "text-green-500",
    },
    {
      title: "Áp lực",
      value: `${main.pressure} hPa`,
      icon: GaugeIcon,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin chi tiết</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={cn("size-5", detail.color)} />
              <div>
                <p className="text-sm leading-none font-medium">
                  {detail.title}
                </p>
                <p className="text-muted-foreground text-sm">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
