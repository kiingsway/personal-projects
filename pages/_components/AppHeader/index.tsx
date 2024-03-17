import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AppHeader.module.scss';
import Buttons from '../Buttons';
import { CgMenuBoxed } from "react-icons/cg";
import useBoolean from '@/app/hooks/useBoolean';
import { Divider, Drawer, Input } from 'antd';
import { rawText } from '@/app/services/helpers';
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import useFavoriteTabs from '@/app/hooks/useFavoriteTabs';
import { ITab } from '@/interfaces';
import appTabs from '@/app/tabs';
import { NextRouter, useRouter } from 'next/router';
import classNames from 'classnames';

export default function AppHeader(): JSX.Element {

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


interface TabsProps {
  tabs: ITab[];
  favoriteTabs: string[];
  // eslint-disable-next-line no-unused-vars
  handleTab: (tab: string, action: "add" | "remove") => void;
  // eslint-disable-next-line no-unused-vars
  router: NextRouter;
}

const Tabs = ({ favoriteTabs, handleTab, tabs, router }: TabsProps): JSX.Element => {

  const { t } = useTranslation();
  const { push, pathname } = router;
  const isTabSelected = (tab_key: string) => (pathname.split('/')?.[1] || "") === tab_key;

  return (
    <>{tabs.map(({ icon, key, title, desc }) => {

      const isFav = favoriteTabs.includes(key);
      const isSelected = isTabSelected(key);
      const onClick = () => handleTab(key, isFav ? "remove" : "add");

      const FavoriteButton = (): JSX.Element => {
        const props = { onClick, className: styles.fav, title: t(isFav ? "UnfavoriteItem" : "FavoriteItem") };
        return isFav ? <FaStar {...props} /> : <FaRegStar {...props} />;
      };

      const props = {
        icon, onClick: () => push(key),
        title: isSelected ? t("TabSelected", { title }) : t("OpenTab", { title }) + (desc ? ` - ${desc}` : ""),
        className: classNames(styles.btn_icon),
        disabled: isSelected,
      };

      return (
        <div key={key} className={styles.window_tabs_item}>
          <FavoriteButton />
          <Buttons.Icon {...props}>{title}</Buttons.Icon>
        </div>
      );
    })}</>
  );
};