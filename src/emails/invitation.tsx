import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface BetterAuthInviteUserEmailProps {
  username?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
}

export const reactInvitationEmail = ({
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
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              邀请 <strong>{invitedByUsername}</strong> 加入{' '}
              <strong>琉璃岛</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              你好，
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
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
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                加入
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              或者复制并粘贴以下URL到你的浏览器：{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              此邀请是发送给 <span className="text-black">{username}</span>{' '}
              的。如果你没有 收到此邀请，可以忽略此邮件。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
