export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>503</h1>
        <span className='font-medium'>网站维护中</span>
        <p className='text-muted-foreground text-center'>
          网站暂时无法访问，请稍后再试。
        </p>
        <div className='mt-6 flex gap-4'>
          <p className='text-muted-foreground text-center'>如有疑问，请联系管理员。</p>
        </div>
      </div>
    </div>
  )
}