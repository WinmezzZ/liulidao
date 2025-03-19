import { sendLogin } from '@/actions/email';
import { UAParser } from 'ua-parser-js';
import { publicIpv4 } from 'public-ip';
import ip from 'ip';
import { qqwry } from '@/lib/qqwry';

export const POST = async (req: Request) => {
  const body = await req.json();
  const ua = UAParser(req.headers.get('user-agent') ?? '');
  const requestIp = req.headers.get('x-forwarded-for') || '';
  const localIp = await publicIpv4();
  const _ip = ip.isEqual(requestIp, '::1') ? localIp : requestIp;

  await sendLogin({
    toMail: body.email,
    username: body.username,
    loginDate: new Date(),
    loginDevice: `${ua.os.name} ${ua.browser.name}`,
    loginLocation: _ip ? qqwry.searchIP(_ip).Country : 'unknown',
    loginIp: _ip,
  });

  return new Response(
    JSON.stringify({
      ok: true,
    }),
    {
      status: 200,
    },
  );
};
