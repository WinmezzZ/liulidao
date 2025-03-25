import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
	Tailwind,
} from "@react-email/components";

interface BetterAuthInviteUserEmailProps {
	username?: string;
	invitedByUsername?: string;
	invitedByEmail?: string;
	teamName?: string;
	teamImage?: string;
	inviteLink?: string;
}

export const InviteUserEmail = ({
	username,
	invitedByUsername,
	invitedByEmail,
	teamName,
	teamImage,
	inviteLink,
}: BetterAuthInviteUserEmailProps) => {
	const previewText = `Join ${invitedByUsername} on BetterAuth`;
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							邀请 <strong>{invitedByUsername}</strong> 加入{" "}
							<strong>琉璃岛</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							你好，
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							<strong>{invitedByUsername}</strong> (
							<Link
								href={`mailto:${invitedByEmail}`}
								className="text-blue-600 no-underline"
							>
								{invitedByEmail}
							</Link>
							) 邀请你加入 <strong>{teamName}</strong> 团队。
						</Text>
						<Section>
							{teamImage ? (
								<Row>
									<Column align="left">
										<Img
											className="rounded-full"
											src={teamImage}
											width="64"
											height="64"
											fetchPriority="high"
										/>
									</Column>
								</Row>
							) : null}
						</Section>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={inviteLink}
							>
								加入
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							或者复制并粘贴以下URL到你的浏览器：{" "}
							<Link href={inviteLink} className="text-blue-600 no-underline">
								{inviteLink}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							此邀请是发送给{" "}
							<span className="text-black">{username}</span> 的。如果你没有
							收到此邀请，可以忽略此邮件。
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export function reactInvitationEmail(props: BetterAuthInviteUserEmailProps) {
	return <InviteUserEmail {...props} />;
}