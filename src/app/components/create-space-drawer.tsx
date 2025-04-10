'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { type z } from 'zod';
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
import { createSpace } from '../(space)/data';
import { createSpaceSchema } from '../schemas/space';

export function CreateSpaceDrawer() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: z.infer<typeof createSpaceSchema>) => {
    const res = await createSpace(data);
    // console.log(res);
    // if (res.success) {
    //   setOpen(false);
    // } else {
    //   toast.error(res.error);
    // }
    // authClient.organization
  };
  return (
    <>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>创建空间</Button>
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
                    <div>设置路径后，空间的url地址将从默认的id改为此路径</div>
                    <div>{process.env.BASE_URL}/slug</div>
                  </>
                ),
              },
            }}
            onSubmit={handleSubmit}
          >
            <DrawerFooter>
              <AutoFormSubmit>保存</AutoFormSubmit>
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
