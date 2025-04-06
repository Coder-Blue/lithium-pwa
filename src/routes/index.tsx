import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  useForecastQuery,
  useGeolocation,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks";
import {
  CurrentWeather,
  FavoriteCities,
  HourlyTemperature,
  WeatherDetails,
  WeatherForecast,
  WeatherSkeleton,
} from "@/components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, MapPinIcon, RefreshCwIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Trang chủ - Lithium Weather" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  function handleRefresh() {
    getLocation();

    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Lỗi định vị</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant={"outline"} onClick={getLocation} className="w-fit">
            <MapPinIcon className="mr-2 size-4" />
            Bật định vị
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPinIcon className="size-4" />
        <AlertTitle>Cần có vị trí</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>
            Vui lòng cho phép sử dụng định vị để xem thời tiết ở địa phương của
            bạn.
          </p>
          <Button variant={"outline"} onClick={getLocation} className="w-fit">
            <MapPinIcon className="mr-2 size-4" />
            Bật định vị
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Thất bại tìm dữ liệu thời tiết. Xin vui lòng thử lại.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCwIcon className="mr-2 size-4" />
            Thử lại
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Vị trí hiện tại của tôi
        </h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCwIcon
            className={cn(
              "size-4",
              weatherQuery.isFetching ? "animate-spin" : "",
            )}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
