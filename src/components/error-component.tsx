import { useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";

export default function ErrorComponent({ error }: { error: Error }) {
  const router = useRouter();

  const queryClientErrorBoundary = useQueryErrorResetBoundary();

  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    queryClientErrorBoundary.reset();
  }, [queryClientErrorBoundary]);

  return (
    <div className="mt-8 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert variant={"destructive"}>
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Ối! Có gì đó không ổn</AlertTitle>
          <AlertDescription>
            Chúng tôi xin lỗi, nhưng trang web đã gặp sự cố bất ngờ
          </AlertDescription>
        </Alert>
        <div className="mt-4 space-y-4">
          <Button
            className="w-full"
            onClick={() => {
              router.invalidate();
            }}
          >
            Thử lại
          </Button>
          <Button asChild className="w-full" variant={"outline"}>
            <Link to="/">Trở về trang chủ</Link>
          </Button>
          {isDev ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="error-details">
                <AccordionTrigger>Xem lỗi chi tiết</AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-md p-4">
                    <h3 className="mb-2 font-semibold">Chi tiết lỗi:</h3>
                    <p className="mb-4 text-sm">{error.message}</p>
                    <h3 className="mb-2 font-semibold">Truy vết lỗi:</h3>
                    <pre className="overflow-x-auto text-xs whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </div>
      </div>
    </div>
  );
}
