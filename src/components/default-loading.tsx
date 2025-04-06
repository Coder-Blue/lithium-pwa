import { LoaderIcon } from "lucide-react";

export default function DefaultLoading() {
  return (
    <div className="mx-auto mt-8 flex flex-col items-center justify-center">
      <LoaderIcon className="animate-spin" />
      <p className="text-muted-foreground mt-2 text-sm">Đang tải...</p>
    </div>
  );
}
