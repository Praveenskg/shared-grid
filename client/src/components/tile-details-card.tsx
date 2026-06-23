import { motion, AnimatePresence } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Tile } from "@/types/tile";

interface TileDetailsCardProps {
  tile: Tile | null;
}

export function TileDetailsCard({ tile }: TileDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tile ? `Tile #${tile.tileId}` : "Tile Details"}</CardTitle>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {tile ? (
            <motion.div
              key={tile.tileId}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.15,
              }}
              className="space-y-4"
            >
              <div>
                <span className="font-medium">Owner:</span>{" "}
                {tile.ownerName ?? "Unclaimed"}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Color:</span>

                {tile.color ? (
                  <>
                    <motion.div
                      className="size-4 rounded-full border"
                      style={{
                        backgroundColor: tile.color,
                      }}
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    />

                    <span className="font-mono text-sm">{tile.color}</span>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>

              <div>
                <span className="font-medium">Status:</span>{" "}
                {tile.ownerId ? "🔒 Claimed" : "🟢 Available"}
              </div>

              <div>
                <span className="font-medium">Claimed:</span>{" "}
                {tile.claimedAt
                  ? new Date(tile.claimedAt).toLocaleString()
                  : "-"}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="text-sm text-muted-foreground"
            >
              Hover over a tile to view details.
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
