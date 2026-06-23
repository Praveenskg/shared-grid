import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useActivities } from "@/hooks/use-activities";

export function RecentActivityCard() {
  const { data } = useActivities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {data?.map((activity) => (
            <motion.div
              key={activity._id}
              layout
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
            >
              <div className="flex gap-2">
                <div
                  className="mt-1 size-3 rounded-full"
                  style={{
                    backgroundColor: activity.color,
                  }}
                />

                <div>
                  <div className="text-sm">
                    <span className="font-medium">{activity.ownerName}</span>{" "}
                    claimed Tile #{activity.tileId}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
