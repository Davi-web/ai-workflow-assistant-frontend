"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRepositoryModal } from "@/stores/useRepositoryModal"

export function RepositoryModal() {
  const { isRepositoryOpen, closeRepository } = useRepositoryModal()

  return (
    <Dialog open={isRepositoryOpen} onOpenChange={closeRepository}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>GitHub Repositories</DialogTitle>
          <DialogDescription>
            Here are the repositories connected to this project:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Link
            href="https://github.com/Davi-web/ai-workflow-assistant-frontend"
            target="_blank"
            className="block text-blue-600 hover:underline"
          >
            🌐 Frontend Repository
          </Link>

          <Link
            href="https://github.com/Davi-web/ai-workflow-assistant-python"
            target="_blank"
            className="block text-blue-600 hover:underline"
          >
            ⚙️ Lambda Repository
          </Link>
        </div>

        <DialogFooter>
          <Button onClick={closeRepository}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
