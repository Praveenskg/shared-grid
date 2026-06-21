import { GridCanvas } from "@/components/grid-canvas";

import { useTiles } from "@/hooks/use-tiles";

function App() {
  const { data, isLoading } = useTiles();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Shared Grid</h1>
        <p className="mt-4">
          Tiles: {data?.length}
        </p>
        <div className="overflow-auto rounded-xl border bg-white p-4">
          <GridCanvas />
        </div>
      </div>
    </main>
  );
}

export default App;
