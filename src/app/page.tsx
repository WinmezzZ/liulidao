import prisma from "@/lib/prisma";
import { EmptySpace } from "./components/empty-spacae";
import { VerifyTip } from "./components/verify-tip";
import { redirect } from "next/navigation";
 
export default async function Page() {
  const spaces = await prisma.space.findMany();

  // if (spaces.length) {
  //   const firstSpace = spaces[0];
  //   const url = firstSpace.slug ? `/${firstSpace.slug}` : `/${firstSpace.id}`;
  //   redirect(url);
  // }

  return (
    <div className="flex flex-1 flex-col">
      <VerifyTip />
      {/* { !spaces.length && <EmptySpace /> } */}
      <EmptySpace />
    </div>
  );
}