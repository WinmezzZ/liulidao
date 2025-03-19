import { Body, Container, Head, Html, Preview, Section, Tailwind, Text } from "@react-email/components";

interface VerificationTemplateProps {
  userName: string;
  code: string;
}

const VerificationTemp = ({ userName = "X", code = "46590" }: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>验证邮箱</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container className="p-6 m-10 mx-auto bg-white">
          <Text className="mb-4 text-lg">Hi, {userName.split(" ")[0]}</Text>
          <Text className="text-base font-semibold text-center">这里是你的验证码</Text>
          <Section className="mt-4 text-center">
            <div className="inline-block px-6 py-3 text-xl font-bold tracking-[10px] text-slate-900">{code}</div>
            <Text className="mt-2.5 text-sm">这个验证码将在3分钟内过期，并且只能使用一次。</Text>
          </Section>
          <Text className="mt-8 text-base">
            感谢使用
            <br />
            <span className="font-bold">琉璃岛</span>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationTemp;
