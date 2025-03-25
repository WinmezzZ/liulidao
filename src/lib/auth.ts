import { betterAuth } from "better-auth";
import { admin, bearer, customSession, emailOTP, magicLink, multiSession, oAuthProxy, oneTap, openAPI, organization, twoFactor, username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "@/lib/resend";
import { reactInvitationEmail } from "@/emails/invitation";
import { reactResetPasswordEmail } from "@/emails/reset-password";
import { nextCookies } from "better-auth/next-js";

console.log("process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

const betterAuthUrl = process.env.BETTER_AUTH_URL!;
const fromEmail = process.env.BETTER_AUTH_EMAIL!;

export const auth = betterAuth({
  trustedOrigins: [process.env.BASE_HOST!],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {  
      enabled: true,
      minPasswordLength: 6,
      async sendResetPassword({ user, url }) {
        const from = process.env.BETTER_AUTH_EMAIL;
        if (!from) {
          throw new Error("请配置 BETTER_AUTH_EMAIL 发送人信息");
        }
        await resend.emails.send({
          from,
          to: user.email,
          subject: "重置琉璃岛密码",
          react: reactResetPasswordEmail({
            username: user.email,
            resetLink: url,
          }),
        });
      },
  },
  emailVerification: {
		async sendVerificationEmail({ user, url }) {
      const fromEmail = process.env.BETTER_AUTH_EMAIL;
      if (!fromEmail) {
        throw new Error("请配置 BETTER_AUTH_EMAIL 发送人信息");
      }
			const res = await resend.emails.send({
				from: fromEmail,
				to:user.email,
				subject: "邮箱验证",
				html: `<a href="${url}">点击此链接以验证你的邮箱</a>`,
			});
			console.log(res, user.email);
		},
	},
  socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
		google: {
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}
	},

  plugins: [
    organization({
      schema: {
        organization: {
          modelName: "space"
        },
        invitation: {
          modelName: "invitation",
          fields: {
            organizationId: "spaceId",
            organization: "space"
          }
        },
        member: {
          modelName: "member",
          fields: {
            organizationId: "spaceId",
            organization: "space"
          }
        },
        session: {
          modelName: "session",
          fields: {
            activeOrganizationId: "activeSpaceId",
          }
        }
      },
			async sendInvitationEmail(data) {
        const from = process.env.BETTER_AUTH_EMAIL;
        if (!from) {
          throw new Error("请配置 BETTER_AUTH_EMAIL 发送人信息");
        }
				await resend.emails.send({
					from,
					to: data.email,
					subject: "你被邀请加入一个空间",
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
			otpOptions: {
				async sendOTP({ user, otp }) {
					await resend.emails.send({
						from: fromEmail,
						to: user.email,
						subject: "两步验证",
						html: `你的两步验证 OTP 是 ${otp}`,
					});
				},
			},
		}),
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
					dd: "test",
				},
			};
		}),
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type}) { 
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "OTP 登录",
          html: `你的登录 OTP 是 ${otp}`,
        });
      }, 
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "url 登录",
          html: `你的 登录url 是 ${url}`,
        });
      }
    }),
    username(),
  ],
});
