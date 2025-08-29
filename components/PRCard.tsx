// components/PRCard.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PRCardProps = {
  title: string;
  summary: string;
  changes: string[];
  labels: string[];
  onClick?: () => void;
};

// Define colors for each possible label
const labelColors: Record<string, string> = {
  Feature: "bg-green-500 text-white",
  Bug: "bg-red-500 text-white",
  Docs: "bg-blue-500 text-white",
};

export default function PRCard({
  title,
  summary,
  changes,
  labels,
}: PRCardProps) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all">
      <CardContent className="p-4 space-y-3">
        {/* Title + Labels */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex gap-2">
            {labels.map((label, idx) => (
              <Badge
                key={idx}
                className={`${labelColors[label] || "bg-gray-300 text-black"} rounded-md px-2 py-1`}
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>

        {/* Changed Files */}
        <div className="flex flex-wrap gap-2">
          {changes.map((file, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
            >
              {file}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
