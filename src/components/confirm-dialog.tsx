'use client';

import {
  type ComponentProps,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConfirmDialogContextProps {
  confirm: (options: ConfirmDialogOptions) => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextProps | null>(
  null
);

type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  label?: string;
  confirmText?: string;
  cancelText?: string;
  inputProps?: ComponentProps<'input'>;
  onConfirm?: (
    close: () => void,
    inputText: string
  ) => void | boolean | Promise<boolean | void>;
  onCancel?: () => void;
};

export function ConfirmDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({});
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleOpen = async (options: ConfirmDialogOptions) => {
    setOptions(options);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (options.onConfirm) {
      setSubmitLoading(true);
      const confirmRes = await options.onConfirm(
        () => setOpen(false),
        inputValue
      );
      setSubmitLoading(false);
      if (confirmRes === true) {
        setOpen(false);
      }
    }
  };

  const handleCancel = () => {
    options.onCancel?.();
    setOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm: handleOpen }}>
      {children}
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options.title}</DialogTitle>
            {options.description && (
              <DialogDescription>{options.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {options.label && (
                <Label htmlFor="confirm-input" className="text-right">
                  {options.label}
                </Label>
              )}
              <Input
                ref={inputRef}
                id="confirm-input"
                placeholder={options.inputProps?.placeholder || '请输入...'}
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
              {options.cancelText || '取消'}
            </Button>
            <Button onClick={handleConfirm} loading={submitLoading}>
              {options.confirmText || '确定'}
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
      'useConfirmDialog must be used within a ConfirmDialogProvider'
    );
  }
  return context.confirm;
}
