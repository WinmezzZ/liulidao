"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { z } from "zod";
import { useState } from "react";
 
const createSpaceSchema = z.object({
   name: z.string({
    required_error: "空间名称不能为空"
   }).min(3, {
    message: "空间名称不能少于3个字符"
   }),
   description: z.string().optional(),
});

export function CreateSpaceDrawer() {
   const [open, setOpen] = useState(false);
  return <>
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
                onSubmit={(data, form) => {
                    console.log(data);
                }}
            >
                <DrawerFooter>
                    <AutoFormSubmit>保存</AutoFormSubmit>
                    <DrawerClose asChild >
                        <Button variant="outline">取消</Button>
                    </DrawerClose>
                </DrawerFooter>
            </AutoForm>
        </DrawerContent>
    </Drawer>
    </>;
}

