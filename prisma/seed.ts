import prisma from "../src/lib/prisma.ts";

export default async function main() {
  const verificationCodes = await prisma.emailVerificationCode.findMany();
  console.log(verificationCodes);
}

main();
