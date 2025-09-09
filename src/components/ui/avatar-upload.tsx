'use client';

import { formatBytes, useFileUpload } from '@/hooks/use-file-upload';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, TriangleAlert, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useImageCropper } from '@/hooks/use-image-cropper';
import { useUploadFile } from '@/hooks/use-upload-file';

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file?: string) => void;
  defaultAvatar?: string;
}

export default function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  defaultAvatar,
}: AvatarUploadProps) {
  const openCropper = useImageCropper();
  const { uploadFile, progress, isUploading, uploadedFile } = useUploadFile();
  const [
    { files, isDragging, errors },
    { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: 'image/*',
    multiple: false,
    onFilesChange: async (files) => {
      if (!files.length) {
        onFileChange?.();
        return;
      }
      const withPreviewFile = files[0];
      const croppedFile = await openCropper(
        'url' in withPreviewFile.file ? withPreviewFile.file.url : withPreviewFile.file,
        { fileName: withPreviewFile.file.name },
      );
      const res = await uploadFile(croppedFile);
      console.log('res', res)
      onFileChange?.(res?.ufsUrl);
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar;

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <div
          className={cn(
            'group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/20',
            previewUrl && 'border-solid',
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <img src={previewUrl} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Remove Button - only show when file is uploaded */}
        {(currentFile || defaultAvatar) && !isUploading && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="size-6 absolute end-0 top-0 rounded-full"
            aria-label="Remove avatar"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Status + Progress */}
      <div className="w-full text-center space-y-1">
        {isUploading && (
          <>
            <p className="text-xs text-muted-foreground">上传中... {progress}%</p>
            <Progress value={progress} className="h-2 w-full" />
          </>
        )}

        {uploadedFile && !isUploading && (
          <div className="flex items-center justify-center gap-1 text-xs text-green-600">
            <CheckCircle2 className="size-4" /> 上传完成
          </div>
        )}

        {!isUploading && !uploadedFile && (
          <>
            <p className="text-xs text-muted-foreground">PNG, JPG 最大 {formatBytes(maxSize)}</p>
          </>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-2 w-full">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>上传失败</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}