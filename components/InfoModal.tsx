"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInfoModal } from "@/stores/useInfoModal";
import { CopyableCode } from "./CopyableCode";

export function InfoModal() {
  const { isInfoOpen, closeInfo } = useInfoModal();

  return (
    <Dialog open={isInfoOpen} onOpenChange={closeInfo}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Setup GitHub Webhook</DialogTitle>
          <DialogDescription>
            Follow these steps to add a webhook to your repository.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ol className="list-decimal list-inside text-sm">
            <li>Go to your repository → Settings → Webhooks</li>
            <li>
              Click <strong>Add Webhook</strong>
            </li>
            <li>
              Use this URL:
              <CopyableCode text="https://63cdzhpf1k.execute-api.us-east-2.amazonaws.com/DEV/webhook" />
            </li>
            <li>
              Content type: <strong>application/json</strong>
            </li>
            <li>
              Events to trigger: Select{" "}
              <strong>Let me select individual events</strong> and check{" "}
              <strong>Pull requests</strong>
            </li>
            <li>
              Click <strong>Add Webhook</strong>
            </li>
          </ol>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            After setting up the webhook, create a new pull request to see it in
            action!
          </p>
        </div>

        <DialogFooter>
          <Button onClick={closeInfo}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
