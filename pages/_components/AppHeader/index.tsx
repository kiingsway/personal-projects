import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AppHeader.module.scss';
import Buttons from '../Buttons';
import { CgMenuBoxed } from "react-icons/cg";
import useBoolean from '@/app/hooks/useBoolean';
import { Button, Divider, Drawer, Input } from 'antd';
import { rawText } from '@/app/services/helpers';
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import useFavoriteTabs from '@/app/hooks/useFavoriteTabs';
import appTabs from '@/app/tabs';
import { useRouter } from 'next/router';
import Tabs from './Tabs';

// export default function AppHeader(): JSX.Element {
export default function AppHeader() {

  const router = useRouter();

  const { t } = useTranslation();
  const [routesWindow, { setTrue: openRWindow, setFalse: closeRWindow }] = useBoolean();
  const [searchTab, setSearchTab] = React.useState('');
  const { favoriteTabs, handleTab } = useFavoriteTabs();

  const filteredTabs = React.useMemo(() => {

    if (!searchTab) return appTabs;

    return appTabs.filter(tab => {
      const [s, ...filters] = [searchTab, tab.key, tab.title, tab.desc,].map(rawText);
      return filters.some(f => f.includes(s));
    }).sort((a, b) => a.title.localeCompare(b.title));

  }, [searchTab]);

  const favTabs = filteredTabs.filter(t => favoriteTabs.includes(t.key));
  const nonFavTabs = filteredTabs.filter(t => !favoriteTabs.includes(t.key));

  const btn1 = <button>a</button>
  const btn2 = <Buttons.Icon>a</Buttons.Icon>;
  console.log('a');

  return (
    <div className={styles.main}>
      <h1 className={styles.main_header}>Personal Projects</h1>
      <div className={styles.main_router}>
        <Buttons.Icon title={t("OpenRoutesMenu")} icon={<CgMenuBoxed fontSize={24} />} onClick={openRWindow} type='text' />
      </div>
      <Drawer title={t('RoutesConfig')} onClose={closeRWindow} open={routesWindow}>
        <div className={styles.window}>
          <div className={'app-scroll ' + styles.window_tabs}>
            <Input value={searchTab} onChange={e => setSearchTab(e.target.value)} placeholder={t('SearchTabPlaceholder')} addonAfter={<SearchClearIcon title={t("ClearSearch")} isClear={Boolean(searchTab)} onClick={() => setSearchTab('')} />} style={{ marginBottom: 8 }} />

            <Tabs tabs={favTabs} favoriteTabs={favoriteTabs} handleTab={handleTab} router={router} />
            {favTabs.length && nonFavTabs.length ? <Divider style={{ marginInline: 0, margin: '8px 0' }} /> : <></>}
            <Tabs tabs={nonFavTabs} favoriteTabs={favoriteTabs} handleTab={handleTab} router={router} />

          </div>
          <div className={styles.window_config} />
        </div>
      </Drawer>
    </div>
  );
}

const SearchClearIcon = ({ isClear, onClick, title }: { isClear: boolean, onClick(): void, title: string }): React.ReactNode => {
  return isClear ? <IoCloseSharp onClick={onClick} style={{ cursor: 'pointer' }} title={title} /> : <IoMdSearch />;
};