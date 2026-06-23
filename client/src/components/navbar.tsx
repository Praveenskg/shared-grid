import { Grid3X3, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useOnlineCount } from "@/hooks/use-online-count";

import { resetGame } from "@/lib/reset-game";

export function Navbar() {
  const onlineCount = useOnlineCount();

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the entire game?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await resetGame();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-md border p-2">
            <Grid3X3 className="size-5" />
          </div>

          <div>
            <h1 className="font-semibold">Shared Grid</h1>

            <p className="text-xs text-muted-foreground">
              Realtime Multiplayer Canvas
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {onlineCount > 0 ? ` Online ${onlineCount}` : "Connecting..."}
          </Badge>

          <Button size="sm" variant="destructive" onClick={handleReset}>
            <RotateCcw className="mr-2 size-4" />
            <span className="hidden sm:inline">Reset Game</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
