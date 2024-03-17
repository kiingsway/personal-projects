import { ITab } from "@/interfaces";
import { NextRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaStar, FaRegStar } from "react-icons/fa";
import Buttons from "../../Buttons";
import styles from '../AppHeader.module.scss';
import classNames from "classnames";

interface Props {
  tabs: ITab[];
  favoriteTabs: string[];
  // eslint-disable-next-line no-unused-vars
  handleTab: (tab: string, action: "add" | "remove") => void;
  // eslint-disable-next-line no-unused-vars
  router: NextRouter;
}

import React from 'react';

export default function Tabs({ favoriteTabs, handleTab, tabs, router }: Props): JSX.Element {
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
          <Buttons.Icon {...props} title={props.title}>{title}</Buttons.Icon>
        </div>
      );
    })}</>
  );
}