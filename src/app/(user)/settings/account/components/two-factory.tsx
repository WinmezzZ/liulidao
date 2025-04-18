import { CheckCircle, Lock } from 'lucide-react';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export function TwoFactory() {
  const confirm = useConfirmDialog();
  const { data: session } = authClient.useSession();
  const [totpUri, setTotpUri] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const twoFactorEnabled = session?.user.twoFactorEnabled;

  const viewBackupCodes = async () => {
    confirm({
      title: '生成备份码',
      description: '开启之前，需要验证你的登录密码',
      inputProps: {
        placeholder: '请输入登录密码',
        type: 'password',
      },
      onConfirm: async (close, inputText) => {
        const res = await authClient.twoFactor.generateBackupCodes({
          password: inputText,
        });
        if (res.data) {
          setBackupCodes(res.data.backupCodes);
          close();
        }
      },
    });
  };

  const handlePinCodeChange = async (value: string) => {
    setPinCode(value);
    if (value.length === 6) {
      const res = await authClient.twoFactor.verifyTotp({
        code: value,
      });
      if (res.data) {
        toast.success('验证成功');
        setPinCode('');
      }
    }
  };

  const handleEnable = async () => {
    confirm({
      title: '启用两步验证（2FA）',
      description: '开启之前，需要验证你的登录密码',
      inputProps: {
        placeholder: '请输入登录密码',
        type: 'password',
      },
      onConfirm: async (close, inputText) => {
        const res = await authClient.twoFactor.enable({
          password: inputText,
        });
        if (res.data) {
          // const res = await authClient.twoFactor.getTotpUri({ password: inputText });
          setTotpUri(res.data.totpURI);
          setPinCode('');
          close();
          // if (res.error) {
          //   toast.error(getErrorMessage(res.error.code));
          // } else {
          //   setTotpUri(res.data.totpURI);
          // }
        }
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Lock className="size-4" />
        {!twoFactorEnabled && (
          <p className="text-sm font-bold">两步验证未启用</p>
        )}
        <p className="text-muted-foreground mb-4 text-sm">
          两步验证添加了一个额外的安全层，通过要求不仅仅是密码来登录您的帐户。
        </p>
        {twoFactorEnabled ? (
          <span className="flex items-center gap-2 text-green-500">
            <CheckCircle className="size-4" />
            已启用
          </span>
        ) : (
          <Button onClick={handleEnable}>启用两步验证</Button>
        )}
      </div>
      {totpUri && (
        <div className="mb-4 flex flex-col gap-8">
          <p>请使用身份验证器应用或浏览器扩展程序进行扫描。</p>
          <QRCode value={totpUri} />
          <div className="grid w-full items-center gap-1.5">
            <div className="items-top flex space-x-2">
              <Checkbox id="trustDevice" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="trustDevice"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  信任此设备
                </label>
                <p className="text-muted-foreground mt-2 w-full text-sm">
                  勾选后，当前设备将被记住 60
                  天。在此期间，用户从此设备后续登录时将不会被提示进行
                  2FA。每次用户成功登录时，信任期限都会刷新。
                </p>
              </div>
            </div>

            <Label htmlFor="email" className="mt-4">
              请输入验证码
            </Label>
            <InputOTP
              maxLength={6}
              value={pinCode}
              onChange={handlePinCodeChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      )}
      {twoFactorEnabled && (
        <div className="flex flex-col gap-4">
          <h5 className="text-sm font-bold">双因素恢复代码 </h5>
          <div>
            <Button onClick={viewBackupCodes}>查看备份码</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {backupCodes.map((code) => (
              <div className="rounded-md bg-gray-100 p-2" key={code}>
                {code}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
