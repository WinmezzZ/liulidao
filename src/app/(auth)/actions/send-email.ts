'use server';

import { nanoid } from 'nanoid';
import { type RecentLoginProps, RecentLoginTemp } from '@/emails/recent-login';
import VerificationTemp from '@/emails/verification';
import { resend } from '@/lib/resend';

export interface SendWelcomeEmailProps {
  toMail: string;
  userName: string;
  code: string;
}

export const sendOTP = async ({
  toMail,
  code,
  userName,
}: SendWelcomeEmailProps) => {
  const subject = '注册验证码';
  const temp = VerificationTemp({ userName, code });

  await resend.emails.send({
    from: '琉璃岛 <root@liulidao.com>',
    to: toMail,
    subject: subject,
    headers: {
      'X-Entity-Ref-ID': nanoid(),
    },
    react: temp,
    text: '',
  });
};

export const sendLogin = async (
  props: RecentLoginProps & { toMail: string }
) => {
  const subject = '琉璃岛登录通知';
  const { toMail, username, ...rest } = props;
  const temp = RecentLoginTemp({ ...rest, username: username || toMail });

  await resend.emails.send({
    from: '琉璃岛 <root@liulidao.com>',
    to: toMail,
    subject: subject,
    headers: {
      'X-Entity-Ref-ID': nanoid(),
    },
    react: temp,
    text: '',
  });
};
