import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface UsernameDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
}

export function UsernameDialog({
  open,
  onSubmit,
}: UsernameDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit(trimmedName);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onPointerDownOutside={(e) =>
          e.preventDefault()
        }
      >
        <DialogHeader>
          <DialogTitle>
            Enter your name
          </DialogTitle>
        </DialogHeader>

        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Your name"
        />

        <Button onClick={handleSubmit}>
          Join Grid
        </Button>
      </DialogContent>
    </Dialog>
  );
}