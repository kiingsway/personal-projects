import { useContext, useLayoutEffect } from "react";
import { AppContext } from "./_app";
import { IUseAppStorage } from "@/app/hooks/useAppStorage";
import appTabs from "@/app/tabs";
import { useRouter } from 'next/navigation';

export default function Home(): null {

  const { push } = useRouter();
  const { appStorage } = useContext(AppContext) as IUseAppStorage;

  const tab = appStorage?.last_tab || appTabs[0].key;

  useLayoutEffect(() => { push(`/${tab}`); }, [push, tab]);

  return null;
}