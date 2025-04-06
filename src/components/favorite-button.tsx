import { useFavorite } from "@/hooks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { WeatherData } from "@/types";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

type FavoriteButtonProps = {
  data: WeatherData;
};

export default function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, isFavorite, deleteFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  function handleToggleFavorite() {
    if (isCurrentlyFavorite) {
      deleteFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Đã xóa ${data.name} khỏi Yêu thích`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Đã thêm ${data.name} vào Yêu thích`);
    }
  }

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size={"icon"}
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <StarIcon
        className={cn("size-4", isCurrentlyFavorite && "fill-current")}
      />
    </Button>
  );
}
