'use client';

import { CropIcon, Trash2Icon } from 'lucide-react';
import React, { createContext, useContext, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  type Crop,
  makeAspectCrop,
  type PixelCrop,
} from 'react-image-crop';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';

import 'react-image-crop/dist/ReactCrop.css';

type InputFile = File | string; // File 或 URL

export interface OpenCropperOptions {
  aspectRatio?: [number, number]; // 例如 [1,1], [16,9]
  fileName?: string; // 自定义导出文件名
}

interface CropperContextType {
  openCropper: (file: InputFile, options?: OpenCropperOptions) => Promise<File>;
}

const CropperContext = createContext<CropperContextType | null>(null);

export function ImageCropperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [aspect, setAspect] = useState<number>(1);
  const [inputFile, setInputFile] = useState<InputFile | null>(null);
  const [outputName, setOutputName] = useState<string>('cropped.png');

  const [crop, setCrop] = useState<Crop>();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [resolveRef, setResolveRef] = useState<(file: File | null) => void>();

  const imgRef = useRef<HTMLImageElement | null>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    if (!crop) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(
          imgRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
      }
      setPreviewUrl(canvas.toDataURL('image/png'));
    }
  }

  async function handleConfirm() {
    if (!previewUrl || !inputFile) {
      resolveRef?.(null);
      setOpen(false);
      return;
    }

    const blob = await (await fetch(previewUrl)).blob();
    const croppedFile = new File([blob], outputName, { type: 'image/png' });

    resolveRef?.(croppedFile);
    setOpen(false);
  }

  function handleCancel() {
    resolveRef?.(null);
    setOpen(false);
  }

  const openCropper = (
    file: InputFile,
    { aspectRatio = [1, 1], fileName }: OpenCropperOptions
  ) => {
    setInputFile(file);
    setAspect(aspectRatio[0] / aspectRatio[1]);
    if (fileName) {
      setOutputName(fileName);
    } else if (file instanceof File) {
      setOutputName(file.name);
    } else {
      try {
        const urlObj = new URL(file);
        setOutputName(urlObj.pathname.split('/').pop() || 'cropped.png');
      } catch {
        setOutputName('cropped.png');
      }
    }
    setOpen(true);
    return new Promise<File>((resolve) => {
      setResolveRef(() => resolve);
    });
  };

  const getFileUrl = (file: InputFile) => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file; // string url
  };

  return (
    <CropperContext.Provider value={{ openCropper }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0">
          <div className="p-6">
            {inputFile && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={onCropComplete}
                aspect={aspect}
                className="w-full"
              >
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={imgRef}
                    alt="Crop source"
                    src={getFileUrl(inputFile)}
                    onLoad={onImageLoad}
                    className="max-h-[460px] object-contain"
                  />
                }
              </ReactCrop>
            )}
          </div>
          <DialogFooter className="justify-center p-6 pt-0">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <Trash2Icon className="mr-1.5 size-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirm}>
              <CropIcon className="mr-1.5 size-4" />
              Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CropperContext.Provider>
  );
}

export function useImageCropper() {
  const ctx = useContext(CropperContext);
  if (!ctx)
    throw new Error('useImageCropper must be used inside ImageCropperProvider');
  return ctx.openCropper;
}

// helper
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 50 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}
