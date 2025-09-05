'use client';

import {
  CloudUpload,
  ImageIcon,
  TriangleAlert,
  Upload,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  type FileMetadata,
  type FileWithPreview,
  useFileUpload,
} from '@/hooks/use-file-upload';
import { cn } from '@/lib/utils';

interface CoverUploadProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
  showUploadTips?: boolean;
}

export default function CoverUpload({
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = 'image/*',
  className,
  onImageChange,
  showUploadTips = true,
}: CoverUploadProps) {
  // Default cover image
  const defaultCoverImage: FileMetadata = {
    id: 'default-cover',
    name: 'cover-image.jpg',
    size: 2048000,
    type: 'image/jpeg',
    url: 'https://picsum.photos/1000/800?grayscale&random=3',
  };

  const [coverImage, setCoverImage] = useState<FileWithPreview | null>({
    id: defaultCoverImage.id,
    file: defaultCoverImage,
    preview: defaultCoverImage.url,
  });

  const [imageLoading, setImageLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setImageLoading(true);
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        setCoverImage(files[0]);
        onImageChange?.(files[0].file as File);

        // Simulate upload progress
        simulateUpload();
      }
    },
  });

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Simulate occasional upload failure (10% chance)
          if (Math.random() < 0.1) {
            setUploadError('Upload failed. Please try again.');
            return 0;
          }

          return 100;
        }

        // Random progress increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setImageLoading(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    onImageChange?.(null);
  };

  const retryUpload = () => {
    if (coverImage) {
      setUploadError(null);
      setIsUploading(true);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  const hasImage = coverImage && coverImage.preview;

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Cover Upload Area */}
      <div
        className={cn(
          'group border-border relative h-full overflow-hidden rounded-xl border transition-all duration-200',
          isDragging
            ? 'border-primary bg-primary/5 border-dashed'
            : hasImage
              ? 'border-border bg-background hover:border-primary/50'
              : 'border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5 border-dashed'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative aspect-[21/9] w-full">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="bg-muted absolute inset-0 flex animate-pulse items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                    <ImageIcon className="size-5" />
                    <span className="text-sm">加载中...</span>
                  </div>
                </div>
              )}

              {/* Actual image */}
              {coverImage.preview && (
                <Image
                  fill
                  src={coverImage.preview}
                  alt="Cover"
                  className={cn(
                    'h-full w-full object-cover transition-opacity duration-300',
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  )}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    onClick={openFileDialog}
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 text-gray-900 hover:bg-white"
                  >
                    <Upload />
                    更换封面
                  </Button>
                  <Button
                    onClick={removeCoverImage}
                    variant="destructive"
                    size="sm"
                  >
                    <XIcon />
                    删除
                  </Button>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="relative">
                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-white/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {Math.round(uploadProgress)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="bg-primary/10 rounded-full p-4">
              <CloudUpload className="text-primary size-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Cover Image</h3>
              <p className="text-muted-foreground text-sm">
                拖放图片到这里，或点击选择文件
              </p>
              <p className="text-muted-foreground text-xs">
                推荐尺寸：1200x514px • 最大文件大小：5MB
              </p>
            </div>

            <Button variant="outline" size="sm">
              <ImageIcon />
              选择文件
            </Button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>文件上传错误</AlertTitle>
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

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Upload failed</AlertTitle>
            <AlertDescription>
              <p>{uploadError}</p>
              <Button onClick={retryUpload} size="sm">
                重新上传
              </Button>
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}

      {/* Upload Tips */}
      {showUploadTips && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="mb-2 text-sm font-medium">封面图片建议</h4>
          <ul className="text-muted-foreground space-y-1 text-xs">
            <li>• 使用高质量图片，好的光照和构图</li>
            <li>• 推荐纵横比：21:9（超宽）以获得最佳效果</li>
            <li>• 避免图片中重要内容靠近边缘</li>
            <li>• 支持的格式：JPG、PNG、WebP</li>
          </ul>
        </div>
      )}
    </div>
  );
}
