'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

type revalidatePathArgs = Parameters<typeof revalidatePath>;
type revalidateTagArgs = Parameters<typeof revalidateTag>;

export async function clearPath(...args: revalidatePathArgs) {
  revalidatePath(...args);
}

export async function clearTag(...args: revalidateTagArgs) {
  revalidateTag(...args);
}
