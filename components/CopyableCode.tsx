"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react" // icons
import { cn } from "@/lib/utils"

export function CopyableCode({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="relative bg-muted rounded p-2">
      <code className="block text-sm text-muted-foreground">{text}</code>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className={cn(
          "absolute top-1 right-1 h-6 w-6 p-0 rounded cursor-pointer",
          copied ? "text-green-600" : "text-muted-foreground"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
