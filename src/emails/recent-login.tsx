import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export interface RecentLoginProps {
  username: string;
  loginDate: Date;
  loginDevice: string;
  loginLocation: string;
  loginIp: string;
}

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export const RecentLoginTemp = ({ username, loginDate, loginDevice, loginLocation, loginIp }: RecentLoginProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);

  return (
    <Html>
      <Head />
      <Preview>琉璃岛登录通知</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Section className="p-8">
              <Row>
                <Column className="flex justify-center w-full">
                  <Img width={200} src={`${baseUrl}/images/logo/logo-brand.png`} />
                </Column>
              </Row>
            </Section>

            <Section className="border border-gray-200 rounded overflow-hidden">
              <Row className="p-5 pb-0">
                <Column>
                  <Heading className="text-[32px] font-bold text-center no-underline">你好 {username},</Heading>
                  <Heading as="h2" className="text-xl font-bold text-center">
                    您刚刚登录了琉璃岛账户。
                  </Heading>

                  <Text className="text-lg">
                    <b>时间: </b>
                    {formattedDate}
                  </Text>
                  <Text className="text-lg mt-[-5px]">
                    <b>设备: </b>
                    {loginDevice}
                  </Text>
                  <Text className="text-lg mt-[-5px]">
                    <b>位置: </b>
                    {loginLocation}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-[-5px]">
                    *基于IP地址的大致地理位置:
                    {loginIp}
                  </Text>

                  <Text className="text-lg">如若是你本人操作，请忽略。</Text>
                  <Text className="text-lg mt-[-5px]">
                    不是我本人？账号密码可能已泄露，请尝试
                    <Button className="text-blue-600 font-bold cursor-pointer px-3">修改密码</Button>
                  </Text>
                </Column>
              </Row>
            </Section>

            <Text className="text-center text-xs text-gray-700">© 2024 | 琉璃岛 | www.liulidao.com</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RecentLoginTemp;
