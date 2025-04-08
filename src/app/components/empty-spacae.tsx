import { CreateSpaceDrawer } from "./create-space-drawer";

export function EmptySpace() {
    return <div className="flex flex-1 items-center justify-center p-6">
    <div className="flex flex-col justify-center items-center gap-4 w-full max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">欢迎使用你的空间</h1>
      <p className="text-gray-500 md:w-2/3 dark:text-gray-400 text-center">
        你还没有创建任何空间，请点击创建空间按钮创建你的第一个空间。
      </p>
      <CreateSpaceDrawer />
    </div>
    </div>;
}
