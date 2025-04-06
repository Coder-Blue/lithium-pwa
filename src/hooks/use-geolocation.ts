import { useEffect, useState } from "react";
import type { Coordinates } from "@/types";

type GeolocationState = {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
};

export default function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  function getLocation() {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Định vị địa lý chưa được hỗ trợ trên trình duyệt của bạn",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Yêu cầu vị trí bị từ chối. Hãy cho phép định vị.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Định vị không hoạt động vào bây giờ.";
            break;
          case error.TIMEOUT:
            errorMessage = "Hết hạn yêu cầu về định vị.";
            break;
          default:
            errorMessage = "Xuất hiện lỗi bất thường.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
