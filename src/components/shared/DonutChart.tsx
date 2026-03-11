import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

interface Segment {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: Segment[]
  centerLabel?: string
}

export function DonutChart({ data, centerLabel }: DonutChartProps) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value: string, entry) => (
              <span className="text-xs text-gray-600">
                {value} ({(entry.payload as Segment | undefined)?.value}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-center">
          <div className="text-2xl font-bold text-gray-900">{data.length}</div>
          <div className="text-xs text-gray-500">{centerLabel}</div>
        </div>
      )}
    </div>
  )
}
