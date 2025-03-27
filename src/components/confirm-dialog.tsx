"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, createContext, useContext, useCallback, useRef, ComponentProps } from "react";

interface OpenDialogResult {
  inputText: string;
  closeDialog: () => void;
}

type ConfirmDialogContextProps = {
  openDialog: (options: ConfirmDialogOptions) => Promise<OpenDialogResult>;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextProps | null>(null);

type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  label?: string;
  confirmText?: string;
  cancelText?: string;
  inputProps?: ComponentProps<"input">;
};

export function ConfirmDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({});
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: OpenDialogResult) => void) | null
  >(null);

  const openDialog = useCallback(
    (dialogOptions: ConfirmDialogOptions = {}) => {
      setOptions(dialogOptions);
      setInputValue("");
      setOpen(true);

      return new Promise<OpenDialogResult>((resolve) => {
        setResolvePromise(() => resolve);
      });
    },
    []
  );

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const value = inputRef.current?.value;
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    if (resolvePromise) {
      resolvePromise({ inputText: value, closeDialog });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue("");
    setResolvePromise(null);
  };

  return (
    <ConfirmDialogContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={open} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options.title}</DialogTitle>
            {options.description && (
              <DialogDescription>{options.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            {
              options.label && (
                <Label htmlFor="confirm-input" className="text-right">
                  {options.label}
                </Label>
              )
            }
              <Input
                ref={inputRef}
                id="confirm-input"
                placeholder={options.inputProps?.placeholder || "请输入..."}
                className="col-span-3"
                autoFocus
                {...options.inputProps}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              {options.cancelText || "取消"}
            </Button>
            <Button onClick={handleConfirm}>
              {options.confirmText || "确定"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within a ConfirmDialogProvider"
    );
  }
  return context.openDialog;
}