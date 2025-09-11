import { type auth } from './auth';

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
