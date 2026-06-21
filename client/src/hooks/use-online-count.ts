import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";

export function useOnlineCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleOnlineCount = (count: number) => {
      setCount(count);
    };

    socket.on("online-count", handleOnlineCount);

    return () => {
      socket.off("online-count", handleOnlineCount);
    };
  }, []);

  return count;
}