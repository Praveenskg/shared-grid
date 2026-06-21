interface OnlineCounterProps {
  count: number;
}

export function OnlineCounter({
  count,
}: OnlineCounterProps) {
  return (
    <div className="rounded-md border px-3 py-1">
      Online: {count}
    </div>
  );
}