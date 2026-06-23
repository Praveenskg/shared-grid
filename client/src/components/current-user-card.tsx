import { User } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useUserStats } from "@/hooks/use-user-stats";

interface Props {
  userId?: string;
}

export function CurrentUserCard({ userId }: Props) {
  const { data, isLoading } = useUserStats(userId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

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
            <User className="size-5" />

            <span>Your Profile</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.div
            className="space-y-4"
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
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <p className="text-sm text-muted-foreground">Name</p>

              <p className="font-medium">{data.ownerName}</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <p className="mb-2 text-sm text-muted-foreground">Color</p>

              <div className="flex items-center gap-2">
                <motion.div
                  className="size-4 rounded-full border"
                  style={{
                    backgroundColor: data.color,
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

                <span className="font-mono text-sm">{data.color}</span>
              </div>
            </motion.div>

            <motion.div
              layout
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <p className="text-sm text-muted-foreground">Tiles Owned</p>

              <p className="font-semibold">{data.tileCount}</p>
            </motion.div>

            <motion.div
              layout
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <p className="text-sm text-muted-foreground">Rank</p>

              <p className="font-semibold">#{data.rank}</p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
