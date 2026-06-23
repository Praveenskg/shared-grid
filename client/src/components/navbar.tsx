import { Grid3X3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useOnlineCount } from "@/hooks/use-online-count";



export function Navbar(
) {
  const onlineCount = useOnlineCount();
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Grid3X3 className="size-5" />

          <h1 className="font-semibold">
            Shared Grid
          </h1>
        </div>

        <Badge variant="secondary">
          Online {onlineCount}
        </Badge>
      </div>
    </header>
  );
}