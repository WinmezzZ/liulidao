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
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface BetterAuthResetPasswordEmailProps {
  username?: string;
  resetLink?: string;
}

export const reactResetPasswordEmail = ({
  username,
  resetLink,
}: BetterAuthResetPasswordEmailProps) => {
  const previewText = '重置琉璃岛密码';
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              重置琉璃岛密码
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              你好 {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              我们收到了一个重置你琉璃岛密码的请求。如果你没有请求此操作，你可以安全地忽略此邮件。
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={resetLink}
              >
                重置密码
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              或者复制并粘贴以下URL到你的浏览器：{' '}
              <Link href={resetLink} className="text-blue-600 no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              如果你没有请求重置密码，请忽略此邮件，或者联系支持。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
