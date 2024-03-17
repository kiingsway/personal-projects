import { ILanguageItem } from "@/app/hooks/useLanguage";
import { TNextTranslation } from "@/interfaces";
import { ButtonProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";

interface IIconLabel {
  icon: JSX.Element;
  label: string;
}

interface ButtonsTabProps extends IIconLabel {
  selected: boolean;
  onClick(): void;
}

interface LanguagesProps {
  language: ILanguageItem;
  t: TNextTranslation;
}

interface SelectorProps extends IIconLabel {
  items: ItemType[];
}

interface ButtonsMenuProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownValueProps extends IIconLabel { }

// eslint-disable-next-line no-unused-vars
type ButtonsFunction<T> = (props: T) => JSX.Element;
export type ButtonsTabFunction = ButtonsFunction<ButtonsTabProps>;
export type ButtonsIconFunction = ButtonsFunction<ButtonProps>;
export type ButtonsMenuFunction = ButtonsFunction<ButtonsMenuProps>;
export type DropdownValueFunction = ButtonsFunction<DropdownValueProps>;
export type SelectorFunction = ButtonsFunction<React.PropsWithChildren<SelectorProps>>;
export type LanguagesFunction = ButtonsFunction<LanguagesProps>;
export type LinkFunction = ButtonsFunction<ButtonProps & { selected?: boolean; }>;