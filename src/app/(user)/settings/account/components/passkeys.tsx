'use client';
import { type Passkey } from 'better-auth/plugins/passkey';
import { format } from 'date-fns';
import { Edit, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export function Passkeys() {
  const confirm = useConfirmDialog();
  const confirmDelete = useConfirmDialog();
  const confirmEdit = useConfirmDialog();
  const { data, refetch, isPending } = authClient.useListPasskeys();

  const handleCreatePasskey = async () => {
    confirm({
      title: '添加 Passkey',
      description: '创建一个新的 Passkey 来安全访问您的账户而无需密码。',
      label: '名称',
      onConfirm: async (close, inputText) => {
        const res = await authClient.passkey.addPasskey({
          name: inputText,
        });
        console.log('res', res);
        if (!res?.error) {
          refetch();
          close();
        } else {
          toast.error(res.error.message);
        }
      },
    });
  };

  const handleDelete = async (id: string) => {
    confirmDelete({
      title: '删除 Passkey',
      description: '确定删除此 Passkey 吗？',
      input: false,
      onConfirm: async (close) => {
        const res = await authClient.passkey.deletePasskey({
          id,
        });
        if (!res?.error) {
          refetch();
          close();
        }
      },
    });
  };

  const handleEdit = async (passkey: Passkey) => {
    confirmEdit({
      title: '编辑 Passkey 名称',
      inputProps: {
        defaultValue: passkey.name,
        placeholder: '请输入 Passkey 名称',
      },
      validator: (value) => !!value,
      onConfirm: async (close, inputText) => {
        const res = await authClient.passkey.updatePasskey({
          id: passkey.id,
          name: inputText,
        });
        if (!res?.error) {
          refetch();
          close();
        }
      },
    });
  };

  return (
    <div>
      <Button onClick={handleCreatePasskey}>添加 Passkey</Button>
      {data?.length ? (
        <ul className="mt-4">
          {data.map((passkey) => (
            <li key={passkey.id} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="mb-0.5 font-medium">
                  {passkey.name || '未命名'}
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-4"
                  onClick={() => handleEdit(passkey)}
                >
                  <Edit className="size-full" />
                </Button>
              </div>
              <span className="text-mute text-sm">
                创建时间：{format(passkey.createdAt, 'PPP')}
              </span>
              <Button
                className="w-20"
                variant="destructive"
                color="red-500"
                onClick={() => handleDelete(passkey.id)}
                loading={isPending}
              >
                删除
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground mt-4 flex justify-center text-sm">
          {isPending ? <Loader className="size-4 animate-spin" /> : '未配置'}
        </p>
      )}
    </div>
  );
}
