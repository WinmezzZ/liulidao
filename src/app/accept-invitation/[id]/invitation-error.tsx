import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function InvitationError() {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<div className="flex items-center space-x-2">
					<AlertCircle className="w-6 h-6 text-destructive" />
					<CardTitle className="text-xl text-destructive">
						邀请错误
					</CardTitle>
				</div>
				<CardDescription>
					邀请过程中出现问题。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="mb-4 text-sm text-muted-foreground">
					你尝试访问的邀请要么无效，要么你没有正确的权限。请检查你的邮箱获取有效的邀请，或者联系发送者。
				</p>
			</CardContent>
			<CardFooter>
				<Link href="/" className="w-full">
					<Button variant="outline" className="w-full">
						返回首页
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}