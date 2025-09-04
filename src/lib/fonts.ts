import {
  Geist as _Geist,
  Inter as _Inter,
  Lora as _Lora,
  Roboto as _Roboto,
} from 'next/font/google';

const Inter = _Inter({
  subsets: ['latin'],
  display: 'swap',
});
const Lora = _Lora({
  subsets: ['latin'],
  display: 'swap',
});
const Robot = _Roboto({
  subsets: ['latin'],
  display: 'swap',
});
const Geist = _Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const fonts = {
  Inter,
  Lora,
  Robot,
  Geist,
};

export const fontNames = Object.keys(fonts) as (keyof typeof fonts)[];

export type FontType = (typeof fontNames)[number];

export const DEFAULT_FONT = 'Robot';
