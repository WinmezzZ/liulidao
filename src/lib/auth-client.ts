import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	twoFactorClient,
	adminClient,
	multiSessionClient,
	oidcClient,
	genericOAuthClient,
	magicLinkClient,
	emailOTPClient,
	usernameClient,
	oneTapClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

export const authClient = createAuthClient({
	plugins: [
		organizationClient(),
		twoFactorClient(),
		adminClient(),
		multiSessionClient(),
		magicLinkClient(),
		emailOTPClient(),
		usernameClient(),
		oidcClient(),
		genericOAuthClient(),
		oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		})
	],
	fetchOptions: {
		onError(e) {
			console.log("e", e);
			if (e.error.code in errorCodes) {
				toast.error(getErrorMessage(e.error));
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = authClient;

authClient.$store.listen("$sessionSignal", async () => {});

type ErrorTypes = Partial<
	Record<
		keyof typeof authClient.$ERROR_CODES,
		{
			en: string,
			zh: string,
		}
	>
>;
const errorCodes = {
	USER_NOT_FOUND: {
		en: "User not found",
		zh: "用户不存在",		
	},
	FAILED_TO_CREATE_USER: {
		en: "Failed to create user",
		zh: "创建用户失败",
	},
	FAILED_TO_CREATE_SESSION: {
		en: "Failed to create session",
		zh: "创建会话失败",
	},
	FAILED_TO_UPDATE_USER: {
		en: "Failed to update user",
		zh: "更新用户失败",
	},
	FAILED_TO_GET_SESSION: {
		en: "Failed to get session",
		zh: "获取会话失败",
	},
	INVALID_PASSWORD: {
		en: "Invalid password",
		zh: "密码错误",
	},
	INVALID_EMAIL: {
		en: "Invalid email",
		zh: "邮箱格式错误",
	},
	INVALID_EMAIL_OR_PASSWORD: {
		en: "Invalid email or password",
		zh: "邮箱或密码错误",
	},
	SOCIAL_ACCOUNT_ALREADY_LINKED: {
		en: "Social account already linked",
		zh: "已绑定社交账号",
	},
	PROVIDER_NOT_FOUND: {
		en: "Provider not found",
		zh: "Provider 不存在",
	},
	INVALID_TOKEN: {
		en: "Invalid token",
		zh: "无效的token",
	},
	ID_TOKEN_NOT_SUPPORTED: {
		en: "id_token not supported",
		zh: "id_token不支持",
	},
	FAILED_TO_GET_USER_INFO: {
		en: "Failed to get user info",
		zh: "获取用户信息失败",
	},
	USER_EMAIL_NOT_FOUND: {
		en: "User email not found",
		zh: "邮箱不存在",
	},
	EMAIL_NOT_VERIFIED: {
		en: "Email not verified",
		zh: "邮箱未验证",
	},
	PASSWORD_TOO_SHORT: {
		en: "Password too short",
		zh: "密码太短",
	},
	PASSWORD_TOO_LONG: {
		en: "Password too long",
		zh: "密码太长",
	},
	USER_ALREADY_EXISTS: {
		en: "User already exists",
		zh: "用户已存在",
	},
	EMAIL_CAN_NOT_BE_UPDATED: {
		en: "Email can not be updated",
		zh: "邮箱不能更新",
	},
	CREDENTIAL_ACCOUNT_NOT_FOUND: {
		en: "Credential account not found",
		zh: "账号不存在",
	},
	SESSION_EXPIRED: {
		en: "Session expired. Re-authenticate to perform this action.",
		zh: "会话过期。请重新认证",
	},
	FAILED_TO_UNLINK_LAST_ACCOUNT: {
		en: "You can't unlink your last account",
		zh: "不能解绑最后一个账号",
	},
	ACCOUNT_NOT_FOUND: {
		en: "Account not found",
		zh: "账号不存在",
	},
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER: {
		en: "username is already taken. please try another.",
		zh: "用户名已被使用"
	}
	
} satisfies ErrorTypes;
 
export const getErrorMessage = (error: Record<string, string>, lang: "en" | "zh" = "zh") => {
	if (!error.code) {
		return "System Error";
	}
	if (error.code in errorCodes) {
		return errorCodes[error.code as keyof typeof errorCodes][lang];
	}
	return error.message;
};