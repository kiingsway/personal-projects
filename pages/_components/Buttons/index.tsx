import React from 'react';
import styles from './Buttons.module.scss';
import { Button, ButtonProps, Dropdown } from 'antd';
import classNames from 'classnames';
import { TbMenu2 } from 'react-icons/tb';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { IoMdGlobe } from 'react-icons/io';
import { ButtonsIconFunction, ButtonsMenuFunction, ButtonsTabFunction, DropdownValueFunction, LanguagesFunction, LinkFunction, SelectorFunction } from './interfaces';
import { AppContext, IAppContext } from '@/pages/_app';

const Menu: ButtonsMenuFunction = props => (
  <button type='button' className={styles.Menu} {...props}>
    <TbMenu2 />
  </button>
);

const DropdownValue: DropdownValueFunction = ({ icon, label }) => (
  <div className={styles.Selector_Value}>
    {icon}
    <span>{label}</span>
  </div>
);

const Icon: ButtonsIconFunction = p => {

  const { children: ch, icon: ic, className: cn, ...props } = p;

  const { children, ...otherProps } = ch ?
    { icon: undefined, children: <>{ic}{ch}</> } :
    { icon: ic, children: <></> };

  return <Button {...props} {...otherProps} className={classNames([styles.Icon, cn])}>{children}</Button>;
};

const Tab: ButtonsTabFunction = p => {

  const { icon, onClick, selected, label } = p;
  const props: ButtonProps = {
    icon, onClick, "aria-selected": selected,
    className: classNames([styles.Tab, { [styles.Tab_Selected]: selected }]),
    type: 'link', size: 'large',
  };

  return <Icon {...props}>{label}</Icon>;
};

const Selector: SelectorFunction = p => {
  const { icon, items, label, children } = p;

  const SelectorLabel = (): JSX.Element => <div className={styles.Selector_Label}>{icon}<span>{label}</span></div>;

  return (
    <div className={styles.Selector}>
      <SelectorLabel />
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={e => e.preventDefault()}><div className={styles.Selector_Value}>{children || '-'}<HiMiniChevronDown /></div></a>
      </Dropdown>
    </div >
  );
};

const Languages: LanguagesFunction = p => {
  const { language: { items } } = React.useContext(AppContext) as IAppContext;
  const { language, t } = p;
  const Value = (): JSX.Element => !language ? <></> : <DropdownValue icon={language.icon} label={language.label} />;
  return <Selector label={t('Language')} items={items} icon={<IoMdGlobe />}><Value /></Selector>;
};

const Link: LinkFunction = p => {

  const { children: ch, icon: ic, className, selected, ...props } = p;

  const moreProps = ch ?
    { icon: undefined, children: <>{ic}{ch}</> } :
    { icon: ic, children: <></> };

  const classes = classNames([
    className,
    styles.Icon,
    styles.Link,
    {[styles.Link_Selected]: selected},
    {[styles.Link_NotSelected]: !selected},
  ]);

  return (
    <Button
      {...props}
      {...moreProps}
      type="link"
      rel="noopener noreferrer"
      target="_blank"
      className={classes}
    />
  );
};

const Buttons = { Tab, Icon, Menu, Languages, Link };

export default Buttons;
