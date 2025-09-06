import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  className?: string
}

export default function NoData({
  title = "NO PRODUCT FOUND",
  description,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 text-center",
        className
      )}
    >
      <div className="mb-6">
        <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 uppercase tracking-wide">
        {title}
      </h2>

      {description && (
        <p className="text-gray-500 text-sm mt-2 max-w-md">{description}</p>
      )}
    </section>
  )
}
