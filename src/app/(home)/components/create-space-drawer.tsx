'use client';

import { type ReactNode, type Ref, useImperativeHandle, useState } from 'react';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { env } from '@/env';
import { api } from '@/trpc/client';
import { createSpaceSchema } from '../../../schema/space';
import { clearPath, clearTag } from '../../actions/revalidate';

export interface SpaceDrawerRef {
  setOpen: (open: boolean) => void;
}

interface SpaceDrawerProps {
  ref?: Ref<SpaceDrawerRef>;
  children?: ReactNode;
}

export function CreateSpaceDrawer({ children, ref }: SpaceDrawerProps) {
  const [open, setOpen] = useState(false);

  const { mutate: createSpace, isPending } = api.space.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      clearTag('spaces');
    },
  });

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  return (
    <>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {children || <Button>创建空间</Button>}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>创建空间</DrawerTitle>
          </DrawerHeader>
          <AutoForm
            className="px-4"
            formSchema={createSpaceSchema}
            fieldConfig={{
              slug: {
                description: (
                  <>
                    <span>设置路径后，空间的url地址将从默认的id改为此路径</span>
                    <br />
                    {/* <span>{env.NEXT_PUBLIC_BASE_URL + '/slug'}</span> */}
                  </>
                ),
              },
            }}
            onSubmit={(v) => createSpace(v)}
          >
            <DrawerFooter>
              <AutoFormSubmit loading={isPending}>保存</AutoFormSubmit>
              <DrawerClose asChild>
                <Button variant="outline">取消</Button>
              </DrawerClose>
            </DrawerFooter>
          </AutoForm>
        </DrawerContent>
      </Drawer>
    </>
  );
}
