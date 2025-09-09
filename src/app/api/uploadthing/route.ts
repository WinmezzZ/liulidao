import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

export const runtime = 'nodejs';

console.log('UPLOADTHING_TOKEN', process.env.UPLOADTHING_TOKEN);

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
