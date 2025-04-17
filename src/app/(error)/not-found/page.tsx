import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {  useRouter } from 'next/navigation'

export default function NotFoundError() {
  const router = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>404</h1>
        <span className='font-medium'>资源不存在</span>
        <p className='text-muted-foreground text-center'>
          您访问的资源不存在或已被删除
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