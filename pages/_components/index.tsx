import { useRouter } from 'next/router';
import React from 'react';

export default function _components(): null {

  const { push } = useRouter();
  React.useEffect(() => { push('/'); }, [push]);

  return null;
}