'use client';

import { type ProviderProps, useContext, useState } from 'react';
import { SpaceContext, type SpaceData } from '../_lib/useSpace';

export function SpaceProvider({ children, value }: ProviderProps<SpaceData>) {
  const context = useContext(SpaceContext); // 获取父级Provider的值
  const [internalData, setInternalData] = useState(value);

  const mergedContext = {
    ...context,
    ...internalData,
  };

  const handleSetData = (data: Partial<SpaceData>) => {
    setInternalData((current) => ({ ...current, ...data }));
  };

  return (
    <SpaceContext.Provider value={{ ...mergedContext, setData: handleSetData }}>
      {children}
    </SpaceContext.Provider>
  );
}
