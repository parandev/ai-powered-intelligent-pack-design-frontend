interface GanttItem {
  name: string
  start: number
  duration: number
  color: string
  label: string
}

interface GanttChartProps {
  items: GanttItem[]
  totalWeeks: number
}

export function GanttChart({ items, totalWeeks }: GanttChartProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-4">
          <div className="w-44 text-sm text-gray-700 shrink-0">{item.name}</div>
          <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
            <div
              className="absolute h-6 rounded-full"
              style={{
                left: `${(item.start / totalWeeks) * 100}%`,
                width: `${(item.duration / totalWeeks) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <div className="w-20 text-sm text-gray-500 text-right shrink-0">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
