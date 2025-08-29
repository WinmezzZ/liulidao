import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import {
  admin,
  bearer,
  customSession,
  emailOTP,
  magicLink,
  multiSession,
  oAuthProxy,
  oneTap,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { notifyEmailVerified } from '@/app/api/email/verified/route';
import { reactInvitationEmail } from '@/emails/invitation';
import { reactResetPasswordEmail } from '@/emails/reset-password';
import { resend } from '@/lib/resend';
// import { redis } from '@/server/redis';
import prisma from './prisma';

const betterAuthUrl = process.env.BETTER_AUTH_URL!;
const fromEmail = process.env.BETTER_AUTH_EMAIL!;

export const auth = betterAuth({
  trustedOrigins: [process.env.BASE_URL!, 'http://10.10.204.38:3002'],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
      allowDifferentEmails: true,
      allowUnlinkingAll: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    async sendResetPassword({ user, url, token }) {
      const from = process.env.BETTER_AUTH_EMAIL;
      if (!from) {
        throw new Error('请配置 BETTER_AUTH_EMAIL 发送人信息');
      }
      await resend.emails.send({
        from,
        to: user.email,
        subject: '重置密码',
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: `${betterAuthUrl}/reset-password/${token}`,
        }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    // autoSignInAfterVerification: false,
    async sendVerificationEmail({ user, url }) {
      const fromEmail = process.env.BETTER_AUTH_EMAIL;
      if (!fromEmail) {
        throw new Error('请配置 BETTER_AUTH_EMAIL 发送人信息');
      }
      const res = await resend.emails.send({
        from: fromEmail,
        to: user.email,
        subject: '邮箱验证',
        html: `<a href="${url}">Hi： ${user.name}，点击此链接以验证你的邮箱</a>`,
      });
      console.log('url', url);
      console.log('res', res.data);
    },
    afterEmailVerification: async (user) => {
      notifyEmailVerified(user.email);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },

  plugins: [
    organization({
      schema: {
        organization: {
          modelName: 'space',
        },
        invitation: {
          modelName: 'invitation',
          fields: {
            organizationId: 'spaceId',
            organization: 'space',
          },
        },
        member: {
          modelName: 'member',
          fields: {
            organizationId: 'spaceId',
            organization: 'space',
          },
        },
        session: {
          modelName: 'session',
          fields: {
            activeOrganizationId: 'activeSpaceId',
          },
        },
      },
      async sendInvitationEmail(data) {
        const from = process.env.BETTER_AUTH_EMAIL;
        if (!from) {
          throw new Error('请配置 BETTER_AUTH_EMAIL 发送人信息');
        }
        await resend.emails.send({
          from,
          to: data.email,
          subject: '你被邀请加入一个空间',
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink: `${betterAuthUrl}/accept-invitation/${data.id}`,
          }),
        });
      },
    }),
    twoFactor({
      issuer: process.env.APP_NAME!,
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from: fromEmail,
            to: user.email,
            subject: '两步验证',
            html: `你的两步验证 OTP 是 ${otp}`,
          });
        },
      },
    }),
    passkey(),
    openAPI(),
    bearer(),
    multiSession(),
    oAuthProxy(),
    nextCookies(),
    oneTap({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }),
    customSession(async (session) => {
      return {
        ...session,
        user: {
          ...session.user,
          dd: 'test',
        },
      };
    }),
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'OTP 登录',
          html: `你的登录 OTP 是 ${otp}`,
        });
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: 'url 登录',
          html: `你的 登录url 是 ${url}`,
        });
      },
    }),
  ],

  // secondaryStorage: {
  //   get: async (key) => {
  //     const value = await redis.get(key);
  //     return value ? value : null;
  //   },
  //   set: async (key, value, ttl) => {
  //     if (ttl) await redis.set(key, value, 'EX', ttl);
  //     else await redis.set(key, value);
  //   },
  //   delete: async (key) => {
  //     await redis.del(key);
  //   },
  // },
});
