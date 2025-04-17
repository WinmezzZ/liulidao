'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ForbiddenError() {
  const router = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>403</h1>
        <span className='font-medium'>禁止访问</span>
        <p className='text-muted-foreground text-center'>
          你没有权限访问此资源
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            返回
          </Button>
          <Link href='/' replace>
            <Button>去首页</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}