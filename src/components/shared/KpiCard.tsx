import type { ReactNode } from 'react'

interface KpiCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: ReactNode
  trend?: string
  trendColor?: string
}

export function KpiCard({ title, value, subtitle, icon, trend, trendColor = 'text-green-600' }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1 min-w-[180px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium">{title}</span>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      {trend && <div className={`text-xs font-medium mt-1 ${trendColor}`}>{trend}</div>}
    </div>
  )
}
