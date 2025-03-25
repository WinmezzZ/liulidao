import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Section,
} from "@react-email/components";

interface BetterAuthResetPasswordEmailProps {
	username?: string;
	resetLink?: string;
}

export const ResetPasswordEmail = ({
	username,
	resetLink,
}: BetterAuthResetPasswordEmailProps) => {
	const previewText = "重置琉璃岛密码";
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							重置琉璃岛密码
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							你好 {username},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							我们收到了一个重置你琉璃岛密码的请求。如果你没有请求此操作，你可以安全地忽略此邮件。
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={resetLink}
							>
								重置密码
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							或者复制并粘贴以下URL到你的浏览器：{" "}
							<Link href={resetLink} className="text-blue-600 no-underline">
								{resetLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							如果你没有请求重置密码，请忽略此邮件，或者联系支持。
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export function reactResetPasswordEmail(
	props: BetterAuthResetPasswordEmailProps,
) {
	return <ResetPasswordEmail {...props} />;
}