import { createFileRoute } from "@tanstack/react-router";
import { useForecastQuery, useWeatherQuery } from "@/hooks";
import { type } from "arktype";
import {
  CurrentWeather,
  FavoriteButton,
  HourlyTemperature,
  WeatherDetails,
  WeatherForecast,
  WeatherSkeleton,
} from "@/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";

const citySearchSchema = type({
  lat: "number",
  lon: "number",
});

export const Route = createFileRoute("/city/$cityName")({
  validateSearch: citySearchSchema,
  loaderDeps: ({ search: { lat, lon } }) => ({ lat, lon }),
  head: ({ params }) => ({
    meta: [{ title: `${params.cityName} - Lithium Weather` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { cityName } = Route.useParams();
  const { lat, lon } = Route.useSearch();

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangleIcon className="size-4" />
        <AlertDescription>
          Thất bại tìm dữ liệu thời tiết. Xin vui lòng thử lại.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton data={{ ...weatherQuery.data, name: cityName }} />
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
