import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function DeleteAccount() {
  const deleteConfirm = useConfirmDialog();

  const handleDeleteConfirm = () => {
    deleteConfirm({
      title: '删除账号',
      description: '请输入 DELETE 确认删除',
      inputProps: {
        placeholder: 'DELETE',
      },
      confirmButtonProps: {
        variant: 'destructive',
      },
      validator(value) {
        if (value !== 'DELETE') {
          return '请输入 DELETE 确认删除';
        }
      },
      onConfirm: async (close) => {
        await authClient.deleteUser({
          callbackURL: '/',
        });
        close();
      },
    });
  };
  return (
    <>
      <p className="mb-4 text-sm">删除账号后，所有数据将被删除，无法恢复</p>
      <Button variant="destructive" onClick={handleDeleteConfirm}>
        确认删除
      </Button>
    </>
  );
}
