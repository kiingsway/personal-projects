import { useLayoutEffect } from "react";
import appTabs from "@/app/tabs";
import { useRouter } from 'next/navigation';
import { IUseAppStorage } from "@/app/hooks/useAppStorage";

interface Props {
  appStorage: IUseAppStorage;
}

export default function Home({ appStorage }: Props): null {

  const { push } = useRouter();

  const tab = appStorage?.appStorage?.last_tab || appTabs[0].key;

  useLayoutEffect(() => { push(`/${tab}`); }, [push, tab]);

  return null;
}