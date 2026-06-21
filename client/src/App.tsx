import { GridCanvas } from "@/components/grid-canvas";
import { useTiles } from "@/hooks/use-tiles";

function App() {
  const { data, isLoading } = useTiles();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">
          Shared Grid
        </h1>

        <div className="overflow-auto rounded-xl border bg-white p-4">
          <GridCanvas tiles={data} />
        </div>
      </div>
    </main>
  );
}

export default App;