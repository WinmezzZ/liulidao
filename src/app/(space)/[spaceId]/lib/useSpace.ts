'use client';

import { type Article, type Space, type User } from '@prisma/client';
import { createContext, useContext } from 'react';

export interface SpaceData {
  space?: Space | null;
  article?: Article | null;
  user?: User | null;
}

export interface SpaceContextProps extends SpaceData {
  setData: (data: Partial<SpaceData>) => any;
}

export const SpaceContext = createContext<SpaceContextProps>({
  setData: () => {},
});

export const useSpace = () => {
  const context = useContext(SpaceContext);
  return context;
};
