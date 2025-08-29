import Qqwry from 'lib-qqwry';
import path from 'path';

export const qqwry = new Qqwry(
  true,
  path.resolve(process.cwd(), 'node_modules/lib-qqwry/data/qqwry.dat')
);
