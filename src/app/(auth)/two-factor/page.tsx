"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
	const [totpCode, setTotpCode] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
			setError("验证码必须是6位数字");
			return;
		}
		authClient.twoFactor
			.verifyTotp({
				code: totpCode,
			})
			.then((res) => {
				if (res.data?.token) {
					setSuccess(true);
					setError("");
				} else {
					setError("验证码错误");
				}
			});
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>TOTP 验证</CardTitle>
					<CardDescription>
						输入你的6位TOTP验证码
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!success ? (
						<form onSubmit={handleSubmit}>
							<div className="space-y-2">
								<Label htmlFor="totp">TOTP 验证码</Label>
								<Input
									id="totp"
									type="text"
									inputMode="numeric"
									pattern="\d{6}"
									maxLength={6}
									value={totpCode}
									onChange={(e) => setTotpCode(e.target.value)}
									placeholder="请输入6位验证码"
									required
								/>
							</div>
							{error && (
								<div className="flex items-center mt-2 text-red-500">
									<AlertCircle className="w-4 h-4 mr-2" />
									<span className="text-sm">{error}</span>
								</div>
							)}
							<Button type="submit" className="w-full mt-4">
								验证
							</Button>
						</form>
					) : (
						<div className="flex flex-col items-center justify-center space-y-2">
							<CheckCircle2 className="w-12 h-12 text-green-500" />
							<p className="text-lg font-semibold">验证成功</p>
						</div>
					)}
				</CardContent>
				<CardFooter className="text-sm text-muted-foreground gap-2">
					<Link href="/two-factor/otp">
						<Button variant="link" size="sm">
							切换到邮箱验证
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}