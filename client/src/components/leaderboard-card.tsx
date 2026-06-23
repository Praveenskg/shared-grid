import { Trophy } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLeaderboard } from "@/hooks/use-leaderboard";

export function LeaderboardCard() {
  const { data, isLoading } = useLeaderboard();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5" />

            <span>Leaderboard</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading leaderboard...
            </p>
          ) : data?.length ? (
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {data.map((user, index) => (
                <motion.div
                  key={user._id}
                  layout
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-sm font-medium">
                      #{index + 1}
                    </span>

                    <motion.div
                      className="size-3 rounded-full border"
                      style={{
                        backgroundColor: user.color,
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

                    <span className="truncate">{user.ownerName}</span>
                  </div>

                  <motion.span layout className="text-sm font-semibold">
                    {user.tileCount}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No claimed tiles yet.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}