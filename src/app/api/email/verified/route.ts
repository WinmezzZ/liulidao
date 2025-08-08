import { type NextRequest } from 'next/server';

type Client = {
  email: string;
  send: (message: string) => void;
};

const clients = new Set<Client>();

// SSE 连接接口
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return new Response('Email required', { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = (message: string) => {
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      };

      const client = { email, send };
      clients.add(client);

      // 保持连接
      send('connected');

      const keepAlive = setInterval(() => {
        send('ping'); // 保持连接，防止超时断开
      }, 15_000);

      req.signal.addEventListener('abort', () => {
        clients.delete(client);
        clearInterval(keepAlive);
      });
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

// 服务端调用此方法通知客户端邮箱验证成功
export function notifyEmailVerified(email: string) {
  for (const client of clients) {
    if (client.email === email) {
      client.send('email-verified');
    }
  }
}
