import { useContext, useLayoutEffect } from "react";
import { AppContext } from "./_app";
import appTabs from "@/app/tabs";
import { useRouter } from 'next/navigation';
import { IAppContext } from "@/interfaces";

export default function Home(): null {

  const { push } = useRouter();
  const { appStorage: { appStorage } } = useContext(AppContext) as IAppContext;

  const tab = appStorage?.last_tab || appTabs[0].key;

  useLayoutEffect(() => { push(`/${tab}`); }, [push, tab]);

  return null;
}