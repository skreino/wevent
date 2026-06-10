export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="aspect-[4/3] shimmer" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded shimmer" />
        <div className="h-4 w-1/2 rounded shimmer" />
      </div>
    </div>
  )
}
