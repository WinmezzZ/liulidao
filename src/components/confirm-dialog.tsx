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
  input?: boolean;
  inputProps?: ComponentProps<'input'>;
  validator?: (
    value: string
  ) => string | boolean | Promise<string> | Promise<boolean> | undefined;
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
  const [errorText, setErrorText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleOpen = async (options: ConfirmDialogOptions) => {
    setOptions(options);
    setErrorText('');
    setInputValue((options.inputProps?.defaultValue as string) || '');
    setOpen(true);
  };

  const handleValidate = async () => {
    if (options.validator) {
      const errorText = await options.validator(inputValue);
      const hasError = typeof errorText === 'string' || errorText === false;
      if (hasError) {
        setErrorText(
          typeof errorText === 'string'
            ? errorText
            : `请输入${options.label || options.inputProps?.placeholder || '请输入'}`
        );
        return false;
      } else {
        setErrorText('');
        return true;
      }
    } else {
      return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleValidate();
  };

  const handleConfirm = async () => {
    if (options.onConfirm) {
      const valid = await handleValidate();
      if (!valid) return;
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
          {options.input !== false && (
            <div className="flex flex-col gap-1 py-4">
              <div className="flex gap-2">
                {options.label && (
                  <Label htmlFor="confirm-input" className="text-right">
                    {options.label}
                  </Label>
                )}
                <Input
                  ref={inputRef}
                  id="confirm-input"
                  placeholder={options.inputProps?.placeholder || '请输入...'}
                  className="flex-1"
                  autoFocus
                  {...options.inputProps}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      await handleConfirm();
                    }
                  }}
                />
              </div>
              {options.validator && errorText && (
                <p className="text-12 text-red-500">{errorText}</p>
              )}
            </div>
          )}
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
