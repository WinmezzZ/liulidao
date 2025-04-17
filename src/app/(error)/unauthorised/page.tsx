'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function UnauthorisedError() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>401</h1>
        <span className='font-medium'>未登录</span>
        <p className='text-muted-foreground text-center'>
          请先登录后尝试访问此资源。
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            返回
          </Button>
          <Button onClick={() => router.push(pathname)}>去登录</Button>
        </div>
      </div>
    </div>
  )
}