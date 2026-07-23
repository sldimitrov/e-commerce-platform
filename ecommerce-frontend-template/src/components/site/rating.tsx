import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  reviews,
  size = 14,
  className,
}: {
  value: number;
  reviews?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={cn(filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")}
            />
          );
        })}
      </div>
      <span className="tabular-nums">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-muted-foreground/70">({reviews})</span>}
    </div>
  );
}
