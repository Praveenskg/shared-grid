import { GridCanvas } from "@/components/grid-canvas";
import { useEffect } from "react";
import { socket } from "./lib/socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("tile-updated", (tile) => {
      console.log("Tile Updated:", tile);
    });

    return () => {
      socket.off("tile-updated");
    };
  }, []);
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Shared Grid</h1>

        <div className="overflow-auto rounded-xl border bg-white p-4">
          <GridCanvas />
        </div>
      </div>
    </main>
  );
}

export default App;
