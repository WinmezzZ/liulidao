"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import google from "@/assets/svg/logo/google.svg";
import github from "@/assets/svg/logo/github.svg";
import { authClient } from "@/lib/auth-client";

export function FormFooter({ isLoading }: { isLoading: boolean }) {
  const socialSignIn = async (provider: "github" | "google") => {
    const { data } = await authClient.signIn.social({
      provider,
    });
    console.log("data", data);
  };
  return (
    <div className='flex flex-col items-center gap-2'>
      <Button variant='outline' className='w-full' type='button' disabled={isLoading} onClick={() => socialSignIn("google")}>
        <Image src={google} alt='google' className='size-5' /> Google
      </Button>
      <Button variant='outline' className='w-full' type='button' disabled={isLoading} onClick={() => socialSignIn("github")}>
        <Image src={github} alt='github' className='size-5' /> GitHub
      </Button>
    </div>
  );
}